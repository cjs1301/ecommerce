import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { CreateFulfillment } from '../dto/req/create-fulfillment.dto';
import { UpdateFulfillment } from '../dto/req/update-fullfillment.dto';
import { GetFulfillmentsQueryDto } from '../dto/req/get-fulfillments.query.dto';
import { GetFulfillmentsResDto } from '../dto/res/get-fulfillments.res.dto';

@Injectable()
export class FulfillmentRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createFulfillment(orderId: string, data: CreateFulfillment) {
        return await this.prisma.$transaction(async (tx) => {
            // 배송 상태 생성
            const order = await tx.order.update({
                where: { id: orderId },
                data: {
                    items: {
                        update: data.items.map((item) => {
                            return {
                                where: { id: item.itemId },
                                data: {
                                    fulfillments: {
                                        create: {
                                            quantity: item.quantity,
                                            status: 'pending',
                                            trackingCompany:
                                                data.trackingCompany,
                                        },
                                    },
                                },
                            };
                        }),
                    },
                },
                include: {
                    items: {
                        include: {
                            fulfillments: {
                                include: {
                                    item: {
                                        include: {
                                            product: true,
                                            bundleItems: true,
                                            options: true,
                                        },
                                    },
                                },
                            },
                            bundleItems: true,
                        },
                    },
                },
            });

            // 재고 업데이트
            return await tx.order.update({
                where: { id: orderId },
                data: {
                    items: {
                        update: order.items.map((item) => {
                            return {
                                where: { id: item.id },
                                data: {
                                    product: {
                                        update: {
                                            quantity: {
                                                decrement: item.quantity,
                                            },
                                        },
                                    },
                                    bundleItems: {
                                        update: item.bundleItems.map(
                                            (bundleItem) => {
                                                return {
                                                    where: {
                                                        id: bundleItem.id,
                                                    },
                                                    data: {
                                                        product: {
                                                            update: {
                                                                quantity: {
                                                                    decrement:
                                                                        item.quantity *
                                                                        bundleItem.quantity,
                                                                },
                                                            },
                                                        },
                                                    },
                                                };
                                            },
                                        ),
                                    },
                                },
                            };
                        }),
                    },
                },
            });
        });
    }

    async updateFulfillment(fulfillmentId: string, data: UpdateFulfillment) {
        return this.prisma.fulfillment.update({
            where: { id: fulfillmentId },
            data: {
                ...data,
            },
        });
    }

    async deleteFulfillment(fulfillmentId: string) {
        return this.prisma.fulfillment.delete({
            where: { id: fulfillmentId },
        });
    }

    async findAllWhitStatus(
        query: GetFulfillmentsQueryDto,
    ): Promise<GetFulfillmentsResDto[]> {
        return this.prisma.fulfillment.findMany({
            where: {
                status: {
                    in: query.fulfillmentStatus,
                },
                item: {
                    is: {
                        order: {
                            is: {
                                status: {
                                    equals: 'paid',
                                },
                            },
                        },
                    },
                },
            },
            include: {
                item: {
                    select: {
                        id: true,
                        orderId: true,
                        product: {
                            select: { name: true },
                        },
                        bundleItems: {
                            select: {
                                product: { select: { name: true, meta: true } },
                                quantity: true,
                            },
                        },
                        options: {
                            select: {
                                variant: { select: { value: true } },
                            },
                        },
                        quantity: true,
                    },
                },
            },
        });
    }
}
