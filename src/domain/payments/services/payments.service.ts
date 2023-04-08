import { Injectable } from '@nestjs/common';
import { PaymentComplete } from '../dto/payment-complete.dto';
import axios from 'axios';
import { PaymentsRepository } from '../repository/payments.repository';
import { UpdatePayment } from '../dto/update-payment.dto';
import { IamportPaymentResDto } from '../dto/iamport-payment.res.dto';

@Injectable()
export class PaymentsService {
    constructor(private readonly paymentsRepository: PaymentsRepository) {}

    /*
     * 전제
     * orderId = merchant_uid와 같다.
     * 검증
     * - 결제 성공일 때 문제 없이 동작해야한다.
     * - 결제해야할 금액과 일치 하지 않을때 성공되서는 안된다.
     * - 결제해야할 주문이 존재해야한다
     * */
    async paymentComplete({ imp_uid, merchant_uid }: PaymentComplete) {
        const access_token = await this.getToken();
        const paymentData: IamportPaymentResDto = await this.getPaymentData(
            imp_uid,
            access_token,
        );
        // iamport 에서 merchant_uid로 보내오는 값은 우리 orderId와 같다
        const orderId = merchant_uid;

        // DB에서 결제되어야 하는 금액 조회
        const order = await this.paymentsRepository.OrdersFindById(
            paymentData.merchant_uid,
        );
        const amountToBePaid = order.payment.amount; // 결제 되어야 하는 금액
        // 결제 검증하기
        const { amount, status } = paymentData;
        if (amount === amountToBePaid) {
            // 결제금액 일치. 결제 된 금액 === 결제 되어야 하는 금액
            // await Orders.findByIdAndUpdate(merchant_uid, { $set: paymentData }); // DB에 결제 정보 저장
            const order = await this.paymentsRepository.OrdersFindByIdAndUpdate(
                orderId,
                amount,
                'beforePayment',
            );
            switch (status) {
                case 'ready': // 가상계좌 발급
                    // DB에 가상계좌 발급 정보 저장
                    const { vbank_num, vbank_date, vbank_name } = paymentData;
                    await this.paymentsRepository.findByCustomerIdAndUpdate(
                        order.customerId,
                        { vbank_num, vbank_date, vbank_name },
                    );
                    // 가상계좌 발급 안내 문자메시지 발송
                    // SMS.send({
                    //     text: `가상계좌 발급이 성공되었습니다. 계좌 정보 ${vbank_num} ${vbank_date} ${vbank_name}`,
                    // });
                    return {
                        status: 'vbankIssued',
                        message: '가상계좌 발급 성공',
                    };
                case 'paid': // 결제 완료
                    // TODO: 결제 정보에 대한 좀더 자세한 정보를 저장할 필요가 있음
                    const updatePayment: UpdatePayment = {
                        provider: paymentData.name,
                        paid_at: paymentData.paid_at,
                    };
                    await this.paymentsRepository.OrderPaymentUpdate(
                        orderId,
                        'paid',
                        updatePayment,
                    );
                    await this.paymentsRepository.createTransaction(orderId, {
                        paid: amount,
                        cancelled: 0,
                        refunded: 0,
                    });
                    return { status: 'success', message: '일반 결제 성공' };
            }
        } else {
            // 결제금액 불일치. 위/변조 된 결제
            throw { status: 'forgery', message: '위조된 결제시도' };
        }
    }

    /*
     * 사용 포인트 복구
     * 결제액 환불
     * */
    async paymentCancel(
        customerId: string,
        orderId: string,
        amount: number,
        point: number,
        reason: string,
    ) {
        try {
            const access_token = await this.getToken();
            await axios({
                url: 'https://api.iamport.kr/payments/cancel',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: access_token,
                },
                data: {
                    // imp_uid: impUid,
                    merchant_uid: orderId,
                    checksum: amount,
                    reason: reason,
                },
            });
            if (point > 0) {
                await this.paymentsRepository.pointRollback(customerId, point);
            }
            await this.paymentsRepository.createTransaction(orderId, {
                paid: 0,
                cancelled: amount,
                refunded: 0,
            });
        } catch (error) {
            throw error;
        }
    }
    async paymentRefund(
        customerId: string,
        orderId: string,
        amount: number,
        point: number,
        reason: string,
    ) {
        try {
            const access_token = await this.getToken();
            await axios({
                url: 'https://api.iamport.kr/payments/cancel',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: access_token,
                },
                data: {
                    // imp_uid: impUid,
                    merchant_uid: orderId,
                    checksum: amount,
                    reason: reason,
                },
            });
            if (point > 0) {
                await this.paymentsRepository.pointRollback(customerId, point);
            }
            await this.paymentsRepository.createTransaction(orderId, {
                paid: 0,
                cancelled: 0,
                refunded: amount,
            });
        } catch (error) {
            throw error;
        }
    }
    //------------------------------------------------------------------------
    private async getToken() {
        const getToken = await axios({
            url: 'https://api.iamport.kr/users/getToken',
            method: 'post', // POST method
            headers: { 'Content-Type': 'application/json' }, // "Content-Type": "application/json"
            data: {
                imp_key: process.env.IAMPORT_API_KEY, // REST API 키
                imp_secret: process.env.IAMPORT_API_SECRET, // REST API Secret
            },
        });
        const { access_token } = getToken.data.response;
        return access_token;
    }

    private async getPaymentData(
        imp_uid: string,
        access_token: string,
    ): Promise<IamportPaymentResDto> {
        const getPaymentData = await axios({
            url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid 전달
            method: 'get', // GET method
            headers: { Authorization: access_token }, // 인증 토큰 Authorization header에 추가
        });
        return getPaymentData.data.response;
    }
}
