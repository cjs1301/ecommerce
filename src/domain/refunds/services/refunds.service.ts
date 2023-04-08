import { BadRequestException, Injectable } from '@nestjs/common';

import { PaymentsService } from '../../payments/services/payments.service';

import { RefundsRepository } from '../repository/refunds.repository';
import { GetRefundsQueryDto } from '../dto/req/get-refunds.query.dto';
import { CreateRefundDto } from '../dto/req/create-refund.dto';
import { OrdersRepository } from '../../orders/repository/orders.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class RefundsService {
    constructor(
        private readonly refundsRepository: RefundsRepository,
        private readonly paymentsService: PaymentsService,
        private readonly ordersRepository: OrdersRepository,
    ) {}

    async getRefundsForMe(customerId: string, query: GetRefundsQueryDto) {
        return this.refundsRepository.findAllByCustomerId(customerId, query);
    }

    async getRefunds(query: GetRefundsQueryDto) {
        return this.refundsRepository.findAll(query);
    }

    async requestRefundForMe(orderId: string, data: CreateRefundDto) {
        const order = await this.ordersRepository.findOne(orderId);
        if (!order) {
            throw new BadRequestException(
                orderId + ' 의 주문 정보를 찾을 수 없습니다',
            );
        }
        const refundEnableOrderStatus = ['paid'];
        if (!refundEnableOrderStatus.includes(order.status)) {
            throw new BadRequestException(
                '환불할 수 있는 주문 상태가 아닙니다.',
            );
        }

        return this.refundsRepository.create(orderId, data);
    }

    async acceptRefund(refundId: string) {
        // TODO: 환불 신청하기
        // await this.paymentsService.paymentRefund(
        //     order.customerId,
        //     order.id,
        //     order.payment.amount,
        //     order.discount.point || 0,
        //     '환불 승인',
        // );
        const refund = await this.refundsRepository.findOne(refundId, {
            item: {
                include: {
                    bundleItems: true,
                },
            },
        });
        if (!refund) {
            throw new BadRequestException('없는 refundId 입니다');
        }
        // 상테 업데이트 및 재고 복구
        return this.refundsRepository.updateRefundedAccept(refundId, refund);
    }
    async getRefundForMe(refundId: string) {
        return this.refundsRepository.findOne(refundId, {
            item: {
                include: {
                    product: true,
                    fulfillments: true,
                },
            },
        });
    }
    async cancelRefundForMe(refundId: string, cancelReason: string) {
        return this.refundsRepository.updateStatus(
            refundId,
            cancelReason,
            'cancelled',
        );
    }
    async unAcceptRefund(refundId: string) {
        return this.refundsRepository.updateStatus(
            refundId,
            '판매자 환불 반려',
            'return',
        );
    }
}
