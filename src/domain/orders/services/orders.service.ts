import { Injectable, BadRequestException } from '@nestjs/common';
import { OrdersRepository } from '../repository/orders.repository';
import { UpdateOrderTransaction } from '../dto/req/update-order-transaction.dto';
import { GetOrdersQueryDto } from '../dto/req/get-orders.query.dto';
import { PaymentsService } from '../../payments/services/payments.service';

@Injectable()
export class OrdersService {
    constructor(
        private readonly ordersRepository: OrdersRepository,
        private readonly paymentsService: PaymentsService,
    ) {}

    async orderTransaction(
        orderId: string,
        updateOrderTransaction: UpdateOrderTransaction,
    ) {
        return this.ordersRepository.updateTransaction(
            orderId,
            updateOrderTransaction,
        );
    }

    async orderListForMe(customerId: string, query: GetOrdersQueryDto) {
        return this.ordersRepository.findAllByCustomerId(customerId, query);
    }

    async cancelForMe(orderId: string, reason: string) {
        const order = await this.ordersRepository.findOne(orderId);
        const canceledEnableStatus = [
            'paid',
            'overPaid',
            'underPaid',
            'beforePayment',
        ];
        if (!canceledEnableStatus.includes(order.status)) {
            throw new BadRequestException(
                '취소할수 있는 주문 상태가 아닙니다.',
            );
        }
        const refundStatus = ['paid', 'overPaid', 'underPaid'];
        if (refundStatus.includes(order.status)) {
            if (!order.payment)
                throw new BadRequestException('결제 정보가 없습니다.');
            //환불 신청하기
            await this.paymentsService.paymentCancel(
                order.customerId,
                orderId,
                order.payment.amount,
                order.discount?.point || 0,
                reason,
            );
        }
        return this.ordersRepository.cancelOrder(orderId, reason);
    }

    async getOrders(queryOptions: GetOrdersQueryDto) {
        return this.ordersRepository.findAllWithOption(queryOptions);
    }

    async getOrder(orderId: string) {
        return this.ordersRepository.findOneWithIncludes(orderId);
    }

    async deleteOrder(orderId: string) {
        return this.ordersRepository.deleteOneOrder(orderId);
    }
}
