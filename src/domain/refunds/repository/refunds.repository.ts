import { GetRefundsQueryDto } from '../dto/req/get-refunds.query.dto';
import { GetRefundsForMeResDto } from '../dto/res/get-refunds-for-me.res.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Prisma, RefundStatus } from '@prisma/client';
import { CreateRefundDto } from '../dto/req/create-refund.dto';
import { GetRefundsResDto } from '../dto/res/get-refunds.res.dto';

@Injectable()
export class RefundsRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findAllByCustomerId(
        customerId: string,
        query: GetRefundsQueryDto,
    ) /*: Promise<GetRefundsForMeResDto[]>*/ {
        return this.prisma.order.findMany({
            where: {
                customerId: customerId,
                items: {
                    some: {
                        refunds: {
                            some: {
                                status: {
                                    in: query.refundStatus,
                                },
                            },
                        },
                    },
                },
            },
            select: {
                id: true,
                status: true,
                items: {
                    select: {
                        id: true,
                        quantity: true,
                        customId: true,
                        product: {
                            select: {
                                name: true,
                                price: true,
                            },
                        },
                        bundleItems: {
                            select: {
                                product: {
                                    select: {
                                        name: true,
                                        price: true,
                                    },
                                },
                            },
                        },
                        fulfillments: {
                            select: {
                                id: true,
                                quantity: true,
                                status: true,
                                trackingCompany: true,
                                trackingUid: true,
                                trackingUrl: true,
                                receivedAt: true,
                                createdAt: true,
                                updatedAt: true,
                            },
                        },
                        refunds: {
                            select: {
                                id: true,
                                quantity: true,
                                status: true,
                                reason: true,
                                cancelReason: true,
                                createdAt: true,
                                updatedAt: true,
                            },
                        },
                    },
                },
                payment: {
                    select: {
                        amount: true,
                    },
                },
                transactions: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    async findOne(refundId: string, include: Prisma.RefundInclude) {
        return this.prisma.refund.findUnique({
            where: { id: refundId },
            include: include,
        });
    }

    async findAll(query: GetRefundsQueryDto) /*: Promise<GetRefundsResDto[]>*/ {
        return this.prisma.order.findMany({
            where: {
                items: {
                    some: {
                        refunds: {
                            some: {
                                status: {
                                    in: query.refundStatus,
                                },
                            },
                        },
                    },
                },
            },
            select: {
                id: true,
                status: true,
                items: {
                    select: {
                        id: true,
                        orderId: true,
                        quantity: true,
                        customId: true,
                        product: {
                            select: {
                                name: true,
                            },
                        },
                        fulfillments: {
                            select: {
                                id: true,
                                quantity: true,
                                status: true,
                                trackingCompany: true,
                                trackingUid: true,
                                trackingUrl: true,
                                receivedAt: true,
                                createdAt: true,
                                updatedAt: true,
                            },
                        },
                        refunds: {
                            select: {
                                id: true,
                                quantity: true,
                                status: true,
                                reason: true,
                                cancelReason: true,
                                createdAt: true,
                                updatedAt: true,
                            },
                        },
                    },
                },
                shippingAddress: {
                    select: {
                        name: true,
                        postcode: true,
                        country: true,
                        state: true,
                        city: true,
                        address1: true,
                        address2: true,
                        mobile: true,
                    },
                },
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    async create(orderId: string, data: CreateRefundDto) {
        return this.prisma.order.update({
            where: { id: orderId },
            data: {
                items: {
                    update: data.items.map((el) => {
                        return {
                            where: { id: el.itemId },
                            data: {
                                refunds: {
                                    create: {
                                        reason: data.reason,
                                        quantity: el.quantity,
                                        status: 'requested',
                                    },
                                },
                            },
                        };
                    }),
                },
            },
        });
    }

    async updateStatus(refundId: string, reason: string, status: RefundStatus) {
        let reasonObj = {};
        switch (status) {
            case 'requested':
                reasonObj = { reason: reason };
                break;
            case 'cancelled':
                reasonObj = { cancelReason: reason };
                break;
            default:
                break;
        }

        return this.prisma.refund.update({
            where: { id: refundId },
            data: {
                status: status,
                ...reasonObj,
            },
            select: {
                id: true,
                item: {
                    select: {
                        id: true,
                        quantity: true,
                        customId: true,
                        product: {
                            select: {
                                id: true,
                                name: true,
                                thumbnail: true,
                            },
                        },
                    },
                },
                quantity: true,
                status: true,
                reason: true,
                cancelReason: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    /**
     * 주문 상품중 부분 환불 승인
     * 재고 동기화
     * **/
    async updateRefundedAccept(refundId: string, refund: any) {
        return this.prisma.orderOnProduct.update({
            where: { id: refund.itemId },
            data: {
                refunds: {
                    update: {
                        where: { id: refundId },
                        data: { status: 'accepted' },
                    },
                },
                product: {
                    update: {
                        quantity: {
                            increment: refund.quantity,
                        },
                    },
                },
                bundleItems: {
                    update: [
                        ...refund.item.bundleItems.map((bundleItem: any) => {
                            return {
                                where: {
                                    id: bundleItem.id,
                                },
                                data: {
                                    product: {
                                        update: {
                                            quantity: {
                                                increment:
                                                    refund.quantity *
                                                    bundleItem.quantity,
                                            },
                                        },
                                    },
                                },
                            };
                        }),
                    ],
                },
                options: {
                    update: [],
                },
            },
        });
    }
}
