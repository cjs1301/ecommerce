import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { GetOrdersQueryDto } from '../dto/req/get-orders.query.dto';
import { UpdateOrderTransaction } from '../dto/req/update-order-transaction.dto';
import { FulfillmentStatus } from '@prisma/client';
import { GetOrdersForMeResDto } from '../dto/res/order/get-orders-for-me.res.dto';
import { GetOrdersResDto } from '../dto/res/order/get-orders.res.dto';

@Injectable()
export class OrdersRepository {
    constructor(private readonly prisma: PrismaService) {}

    async updateTransaction(orderId: string, data: UpdateOrderTransaction) {
        return this.prisma.order.update({
            where: { id: orderId },
            data: {
                transactions: {
                    create: {
                        ...data,
                    },
                },
            },
            include: {
                transactions: true,
                payment: true,
                canceled: true,
            },
        });
    }

    async findAllByCustomerId(
        customerId: string,
        query: GetOrdersQueryDto,
    ): Promise<GetOrdersForMeResDto[]> {
        return this.prisma.order.findMany({
            where: {
                customerId: customerId,
                status: {
                    in: query.status,
                },
            },
            select: {
                id: true,
                price: true,
                request: true,
                status: true,
                payment: true,
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
                items: {
                    select: {
                        id: true,
                        quantity: true,
                        customId: true,
                        product: {
                            select: {
                                id: true,
                                type: true,
                                thumbnail: true,
                                summary: true,
                                name: true,
                                price: true,
                            },
                        },
                        bundleItems: {
                            select: {
                                id: true,
                                product: {
                                    select: {
                                        id: true,
                                        type: true,
                                        thumbnail: true,
                                        summary: true,
                                        name: true,
                                        price: true,
                                    },
                                },
                                quantity: true,
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
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    async findAllWithOption(
        query: GetOrdersQueryDto,
    ): Promise<GetOrdersResDto[]> {
        console.log(query);
        return this.prisma.order.findMany({
            where: {
                status: {
                    in: query.status,
                },
            },
            select: {
                id: true,
                price: true,
                status: true,
                request: true,
                customer: {
                    select: {
                        name: true,
                        email: true,
                        mobile: true,
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
                items: {
                    select: {
                        id: true,
                        orderId: true,
                        quantity: true,
                        customId: true,
                        product: {
                            select: {
                                id: true,
                                type: true,
                                name: true,
                                thumbnail: true,
                                summary: true,
                                price: true,
                            },
                        },
                        bundleItems: {
                            select: {
                                product: {
                                    select: {
                                        name: true,
                                        meta: true,
                                    },
                                },
                                quantity: true,
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
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    async findAllByOrderIds(orderIds: string[]) {
        return this.prisma.order.findMany({
            where: {
                id: {
                    in: orderIds,
                },
            },
        });
    }

    async findOne(orderId: string) {
        return this.prisma.order.findUnique({
            where: { id: orderId },
            include: {
                payment: true,
                discount: true,
                items: {
                    include: {
                        fulfillments: true,
                        refunds: true,
                    },
                },
            },
        });
    }

    // 재고 복구, 취소 상태 변경
    async cancelOrder(orderId: string, reason: string) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: {
                items: {
                    include: {
                        bundleItems: true,
                        options: true,
                    },
                },
            },
        });
        return this.prisma.order.update({
            where: { id: orderId },
            data: {
                canceled: {
                    create: {
                        reason: reason,
                    },
                },
                status: 'cancelled',
                items: {
                    update: [
                        ...order.items.map((item) => {
                            return {
                                where: { id: item.id },
                                data: {
                                    product: {
                                        update: {
                                            quantity: {
                                                increment: item.quantity,
                                            },
                                        },
                                    },
                                    bundleItems: {
                                        update: [
                                            ...item.bundleItems.map(
                                                (bundleItem) => {
                                                    return {
                                                        where: {
                                                            id: bundleItem.id,
                                                        },
                                                        data: {
                                                            product: {
                                                                update: {
                                                                    quantity: {
                                                                        increment:
                                                                            item.quantity *
                                                                            bundleItem.quantity,
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    };
                                                },
                                            ),
                                        ],
                                    },
                                    options: {
                                        update: [],
                                    },
                                },
                            };
                        }),
                    ],
                },
            },
        });
    }

    async findOneWithIncludes(orderId: string) {
        return this.prisma.order.findUniqueOrThrow({
            where: { id: orderId },
            include: {
                payment: true,
                shippingAddress: true,
                transactions: true,
                canceled: true,
                items: {
                    include: {
                        product: true,
                        options: true,
                        fulfillments: true,
                        bundleItems: true,
                        refunds: true,
                    },
                },
            },
        });
    }

    async deleteOneOrder(orderId: string) {
        return this.prisma.order.delete({
            where: { id: orderId },
        });
    }
    async findAllOrdersInItemIdsAndQuantity(orderIds: string[]) {
        return this.prisma.order.findMany({
            where: {
                id: {
                    in: orderIds,
                },
            },
            select: {
                id: true,
                items: {
                    select: { id: true, quantity: true },
                },
            },
        });
    }

    async createManyFulfillment(
        data: Array<{
            itemId: string;
            quantity: number;
            status: FulfillmentStatus;
            trackingCompany: string;
            trackingUid?: string;
            trackingUrl?: string;
        }>,
    ) {
        return this.prisma.fulfillment.createMany({ data });
    }

    /**
     * 주문 전체 환불 승인
     * 재고 동기화
     * **/
    // async updateOrderRefundedAccept(orderId: string) {
    //     const order = await this.prisma.order.findUnique({
    //         where: { id: orderId },
    //         include: {
    //             refunds: {
    //                 include: {
    //                     item: {
    //                         include: {
    //                             bundleItems: true,
    //                         },
    //                     },
    //                 },
    //             },
    //         },
    //     });
    //     return this.prisma.order.update({
    //         where: { id: orderId },
    //         data: {
    //             refunds: {
    //                 update: order.refunds.map((refund) => {
    //                     return {
    //                         where: { id: refund.id },
    //                         data: {
    //                             status: 'accepted',
    //                             item: {
    //                                 update: {
    //                                     product: {
    //                                         update: {
    //                                             quantity: {
    //                                                 increment: refund.quantity,
    //                                             },
    //                                         },
    //                                     },
    //                                     bundleItems: {
    //                                         update: [
    //                                             ...refund.item.bundleItems.map(
    //                                                 (bundleItem) => {
    //                                                     return {
    //                                                         where: {
    //                                                             id: bundleItem.id,
    //                                                         },
    //                                                         data: {
    //                                                             product: {
    //                                                                 update: {
    //                                                                     quantity:
    //                                                                         {
    //                                                                             increment:
    //                                                                                 refund.quantity *
    //                                                                                 bundleItem.quantity,
    //                                                                         },
    //                                                                 },
    //                                                             },
    //                                                         },
    //                                                     };
    //                                                 },
    //                                             ),
    //                                         ],
    //                                     },
    //                                     options: {
    //                                         update: [],
    //                                     },
    //                                 },
    //                             },
    //                         },
    //                     };
    //                 }),
    //             },
    //         },
    //     });
    // }
}
