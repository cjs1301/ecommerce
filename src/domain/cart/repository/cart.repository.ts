import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/database/prisma.service';
import { AddCartItem } from '../dto/req/add-cartItem.dto';
import { CreateOrder } from '../../orders/dto/req/create-order.dto';
import { UpdateCartItem } from '../dto/req/update-cart-item.dto';
import { CheckoutResDto } from '../dto/res/checkout.res.dto';
import { PointService } from '../../point/services/point.service';
import { CartItemResDto } from '../dto/res/cart-item.res.dto';

@Injectable()
export class CartRepository {
    constructor(
        private readonly prisma: PrismaService,
        private readonly pointService: PointService,
    ) {}

    async findOneCustomerByIdWithPoint(customerId: string) {
        return this.prisma.customer.findUnique({
            where: { id: customerId },
            select: {
                point: true,
            },
        });
    }

    async findOneCartByCustomerId(customerId: string) {
        return this.prisma.cart.upsert({
            where: { customerId: customerId },
            create: { customerId: customerId },
            update: {},
            select: {
                items: {
                    select: {
                        id: true,
                        product: {
                            select: {
                                id: true,
                                thumbnail: true,
                                name: true,
                                summary: true,
                                price: true,
                                discountType: true,
                                discountValue: true,
                            },
                        },
                        options: {
                            select: {
                                id: true,
                                productOption: {
                                    select: {
                                        id: true,
                                        name: true,
                                    },
                                },
                                variant: {
                                    select: {
                                        id: true,
                                        value: true,
                                    },
                                },
                            },
                        },
                        bundleItems: {
                            select: {
                                id: true,
                                quantity: true,
                                product: {
                                    select: {
                                        id: true,
                                        name: true,
                                        price: true,
                                    },
                                },
                            },
                        },
                        customId: true,
                        quantity: true,
                        addedAt: true,
                    },
                },
            },
        });
    }

    async findOrCreateCart(customerId: string) {
        return this.prisma.cart.upsert({
            where: { customerId: customerId },
            update: {},
            create: { customerId: customerId },
            select: {
                id: true,
            },
        });
    }

    async cartItemFindOne(cartId: string, productId: string, customId: string) {
        return this.prisma.cartOnProduct.findFirst({
            where: {
                cartId: cartId,
                productId: productId,
                customId: customId,
            },
            select: { id: true },
        });
    }

    async cartItemQuantityIncrement(
        cartId: string,
        quantity: number,
        select,
    ): Promise<CartItemResDto> {
        return this.prisma.cartOnProduct.update({
            where: {
                id: cartId,
            },
            data: {
                quantity: { increment: quantity },
            },
            select: {
                id: true,
                quantity: true,
                customId: true,
                bundleItems: {
                    select: {
                        id: true,
                        quantity: true,
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                            },
                        },
                    },
                },
                options: {
                    select: {
                        id: true,
                        productOption: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                        variant: {
                            select: {
                                id: true,
                                value: true,
                            },
                        },
                    },
                },
                product: {
                    select: {
                        id: true,
                        name: true,
                        summary: true,
                        price: true,
                        discountType: true,
                        discountValue: true,
                    },
                },
                addedAt: true,
            },
        });
    }

    async createCartItem(
        cartId: string,
        data: AddCartItem,
        select,
    ): Promise<CartItemResDto> {
        return this.prisma.cartOnProduct.create({
            data: {
                cartId: cartId,
                productId: data.productId,
                quantity: data.quantity,
                customId: data.customId,
                options: {
                    createMany: {
                        data: [...data.options],
                    },
                },
                bundleItems: {
                    createMany: {
                        data: [...data.bundleItems],
                    },
                },
            },
            select: {
                id: true,
                quantity: true,
                customId: true,
                bundleItems: {
                    select: {
                        id: true,
                        quantity: true,
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                            },
                        },
                    },
                },
                options: {
                    select: {
                        id: true,
                        productOption: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                        variant: {
                            select: {
                                id: true,
                                value: true,
                            },
                        },
                    },
                },
                product: {
                    select: {
                        id: true,
                        name: true,
                        summary: true,
                        price: true,
                        discountType: true,
                        discountValue: true,
                    },
                },
                addedAt: true,
            },
        });
    }

    async updateCartItem(itemId: string, data: UpdateCartItem, select) {
        try {
            return this.prisma.cartOnProduct.update({
                where: {
                    id: itemId,
                },
                data: {
                    ...data,
                },
                select,
            });
        } catch (error) {
            throw error;
        }
    }

    async deleteCartOnProduct(customerId: string, itemIds: string[]) {
        try {
            const itemList = itemIds.map((el) => {
                return {
                    id: el,
                };
            });
            return this.prisma.cartOnProduct.deleteMany({
                where: { OR: [...itemList] },
            });
        } catch (error) {
            throw error;
        }
    }

    async deleteAll(customerId: string) {
        return this.prisma.cart.deleteMany({
            where: { customerId: customerId },
        });
    }

    async findCustomerByIdWithCartAndPoint(customerId: string) {
        return this.prisma.customer.findUnique({
            where: { id: customerId },
            select: {
                point: true,
                cart: {
                    select: {
                        items: {
                            select: {
                                product: {
                                    select: {
                                        id: true,
                                    },
                                },
                                quantity: true,
                                customId: true,
                                bundleItems: {
                                    select: {
                                        productId: true,
                                        quantity: true,
                                    },
                                },
                                options: {
                                    select: {
                                        productOptionId: true,
                                        variantId: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    }

    async findAllProductForCheck(productIds: { id: string }[]) {
        return this.prisma.product.findMany({
            where: {
                OR: productIds,
            },
            select: {
                id: true,
                name: true,
                available: true,
                quantity: true,
                price: true,
            },
        });
    }
    /**
     * @param customerId
     * @param data
     * @param withMyCart
     * @returns createOrder
     * 상품 수량 감소 하지 않음
     * 주문 전표 만들기: Order 생성
     * 체크아웃된 카트 상품 제거
     */
    async cartCheckout(
        customerId: string,
        data: CreateOrder,
        withMyCart: boolean,
    ): Promise<CheckoutResDto> {
        return await this.prisma.$transaction(async (tx) => {
            // 주문 데이터 만들기 = createOrder
            const createOrderResult = await tx.order.create({
                data: {
                    customerId: customerId,
                    price: 0,
                    status: data.status,
                    items: {
                        create: data.items.map((el) => {
                            return {
                                product: {
                                    connect: {
                                        id: el.productId,
                                    },
                                },
                                quantity: el.quantity,
                                customId: el.customId,
                                options: {
                                    createMany: {
                                        data: el.options || [],
                                    },
                                },
                                bundleItems: {
                                    createMany: {
                                        data: el.bundleItems || [],
                                    },
                                },
                            };
                        }),
                    },
                    request: data.request,
                    shippingAddress: {
                        create: {
                            ...data.shippingAddress,
                        },
                    },
                },
                include: {
                    items: {
                        select: {
                            id: true,
                            quantity: true,
                            product: {
                                select: {
                                    price: true,
                                },
                            },
                            bundleItems: {
                                select: {
                                    id: true,
                                    product: {
                                        select: {
                                            price: true,
                                        },
                                    },
                                    quantity: true,
                                },
                            },
                        },
                    },
                },
            });
            // 체크아웃된 카트 상품 제거
            if (withMyCart) {
                await tx.cart.update({
                    where: {
                        customerId: customerId,
                    },
                    data: {
                        items: {
                            deleteMany: [
                                ...data.items.map((el) => {
                                    return {
                                        productId: el.productId,
                                        customId: el.customId,
                                    };
                                }),
                            ],
                        },
                    },
                });
            }

            const totalPrice: number = createOrderResult.items.reduce(
                (acc, cur) => {
                    const bundleItemPrice = cur.bundleItems.reduce((a, b) => {
                        return (a = a + b.product.price * b.quantity);
                    }, 0);
                    return (acc =
                        acc +
                        bundleItemPrice +
                        cur.product.price * cur.quantity);
                },
                0,
            );

            // TODO: 현재 포인트로만 할인이 되기 때문에 추후 상품 자체 할인이나, 쿠폰할인등을 개발할시 수정해야함
            const totalDiscount: number = data.usePoint;

            // 포인트 사용시
            if (data.usePoint > 0) {
                await this.pointService.usePoint(tx, customerId, data.usePoint);
            }
            // 상품 재고 업데이트 및 최종 가격정보 업데이트
            // 1개의 트랜젝션에서 주문을 생성한 결과 값만 response로 전달한다
            return tx.order.update({
                where: { id: createOrderResult.id },
                data: {
                    price: totalPrice,
                    status:
                        totalPrice === totalDiscount ? 'paid' : 'beforePayment',
                    payment:
                        totalPrice === totalDiscount
                            ? {}
                            : {
                                  create: {
                                      amount: totalPrice - totalDiscount,
                                  },
                              },
                    // customer: {
                    //     update: {
                    //         point: {
                    //             decrement: data.usePoint,
                    //         },
                    //     },
                    // },
                    discount:
                        totalDiscount > 0
                            ? {
                                  create: {
                                      point: data.usePoint,
                                  },
                              }
                            : {},
                },
                include: {
                    discount: true,
                },
            });
        });
    }
}
