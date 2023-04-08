import { Injectable, BadRequestException } from '@nestjs/common';
import { CartRepository } from '../repository/cart.repository';
import { AddCartItem } from '../dto/req/add-cartItem.dto';
import { CreateOrder } from '../../orders/dto/req/create-order.dto';
import { CheckoutReqDto } from '../dto/req/checkout.req.dto';
import { CreateOrderOnProduct } from '../../orders/dto/req/create-order-on-product.dto';
import { CartItemResDto } from '../dto/res/cart-item.res.dto';
import { CustomersRepository } from '../../users/customers/repository/customers.repository';

interface CheckItem {
    quantity: number;
    product: { id: string; quantity: number; available: boolean; name: string };
}
@Injectable()
export class CartService {
    constructor(
        private readonly cartRepository: CartRepository,
        private readonly customersRepository: CustomersRepository,
    ) {}

    //cartItem(cartOnProduct) select 옵션
    private readonly select = {
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
    };

    async getCart(customerId: string) {
        const { items } = await this.cartRepository.findOneCartByCustomerId(
            customerId,
        );
        return items || [];
    }

    async addCartItem(
        customerId: string,
        body: AddCartItem,
    ): Promise<CartItemResDto> {
        const cart = await this.cartRepository.findOrCreateCart(customerId);
        // // 상품 판매상태와 품절상태 확인
        // await this.checkProducts([body.productId]);
        // 카트내 동일 품목 탐색
        const sameItem = await this.cartRepository.cartItemFindOne(
            cart.id,
            body.productId,
            body.customId,
        );

        // 동일 품목 존재시
        if (sameItem) {
            return this.cartRepository.cartItemQuantityIncrement(
                sameItem.id,
                body.quantity,
                this.select,
            );
        }
        // 동일 품목 없을시
        return this.cartRepository.createCartItem(cart.id, body, this.select);
    }

    async cartEmpty(customerId: string) {
        return this.cartRepository.deleteAll(customerId);
    }

    async deleteCartItem(customerId: string, itemIds: string[]) {
        if (itemIds.length === 0) {
            return this.cartRepository.deleteAll(customerId);
        }
        return this.cartRepository.deleteCartOnProduct(customerId, itemIds);
    }

    async checkout(customerId: string, body: CheckoutReqDto) {
        let items: Array<CreateOrderOnProduct>;
        if (body.items.length === 0) {
            // body에 빈배열로 보낼경우 내 카트상품들을 모두 주문한다
            const customer = await this.customersRepository.findOneById(
                customerId,
                {
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
            );
            items =
                customer.cart?.items.map((el) => {
                    return {
                        productId: el.product?.id || '',
                        quantity: el.quantity,
                        customId: el.customId,
                        bundleItems: el.bundleItems || [],
                        options: el.options || [],
                    };
                }) || [];

            if (body.usePoint > 0 && body.usePoint > customer.point)
                throw new BadRequestException(
                    '사용하려는 포인트가 보유포인트보다 많습니다.',
                );
            return this.createOrder(
                items,
                body,
                customerId,
                true,
                body.usePoint,
            );
        } else {
            // 직접 넣어준 상품들로 주문한다
            items = body.items;
            const { point } = await this.customersRepository.findOneById(
                customerId,
                {
                    point: true,
                },
            );
            if (body.usePoint > 0 && body.usePoint > point)
                throw new BadRequestException(
                    '사용하려는 포인트가 보유포인트보다 많습니다.',
                );
            return this.createOrder(
                items,
                body,
                customerId,
                false,
                body.usePoint,
            );
        }
    }

    private async createOrder(
        items: any,
        body: any,
        customerId: string,
        withMyCart: boolean,
        usePoint: number,
    ) {
        if (!items || items.length === 0)
            throw new BadRequestException('주문 하실 상품이 없습니다');
        const data: CreateOrder = {
            items: [...items],
            shippingAddress: body.shippingAddress,
            request: body.request || null,
            status: 'beforePayment',
            usePoint: usePoint,
        };
        // 상품 상태 체크 (판매 상태)
        await this.checkProductsBeforeCheckOut(items);
        return this.cartRepository.cartCheckout(customerId, data, withMyCart);
    }

    /**
     * 상품 판매 여부, 품절상태 확인
     * @param items
     */
    private async checkProductsBeforeCheckOut(items: CreateOrderOnProduct[]) {
        const productIds: { id: string }[] = [];
        // 주문 하려 하는 아이템들의 상품과 그 추가 사품의 모든 아이디를 배열에 담습니다
        items.forEach((item) => {
            productIds.push({ id: item.productId });
            item.bundleItems.forEach((bundleItem) => {
                productIds.push({ id: bundleItem.productId });
            });
        });
        // 상품 정보들을 읽어 옵니다
        const products = await this.cartRepository.findAllProductForCheck(
            productIds,
        );

        const checkItems = items.map((item) => {
            const itemProduct = products.find(
                (product) => product.id === item.productId,
            );
            if (!itemProduct)
                throw new BadRequestException(
                    item.productId + '상품이 없습니다.',
                );
            return {
                quantity: item.quantity,
                product: itemProduct,
                bundleItems: item.bundleItems.map((bundleItem) => {
                    const bundleItemProduct = products.find(
                        (product) => product.id === bundleItem.productId,
                    );
                    if (!bundleItemProduct)
                        throw new BadRequestException(
                            bundleItem.productId +
                                '는 ' +
                                itemProduct.name +
                                '의 번들 상품이 아닙니다.',
                        );
                    return {
                        quantity: bundleItem.quantity,
                        product: bundleItemProduct,
                    };
                }),
            };
        });
        checkItems.forEach((checkItem) => {
            this.itemProductAvailableCheck(checkItem);
            checkItem.bundleItems?.forEach((bundleItem) => {
                this.itemProductAvailableCheck(bundleItem);
            });
        });
    }

    private itemProductAvailableCheck(item: CheckItem) {
        if (!item.product.available)
            throw new BadRequestException(
                `${item.product.name}은 판매중이 아닙니다`,
            );
        // if (item.quantity > item.product.quantity)
        //     throw new BadRequestException(
        //         `id: ${item.product.id} name: ${item.product.name}의 재고가 부족 합니다`,
        //     );
    }
}
