import { DiscountType } from '@prisma/client';

export class Product {
    constructor(
        private id: string,
        // 상품의 구매 가능 여부입니다.
        private available: boolean,
        // 상품의 썸네일입니다.
        private thumbnail: string | null,
        // 상품의 이름입니다.
        private name: string,
        // 상품의 요약 설명입니다.
        private summary: string | null,
        // 상품에 대한 설명입니다.
        private description: string | null,
        // 키워드 ( 미사용 개념 미적립)
        private keywords: string | null,
        // 가격
        private price: number,
        // 상품의 할인 방식입니다. "percentage"or"fixed"or null
        private discountType: DiscountType | null,
        // 할인 값
        private discountValue: number | null,
        // 상품 수량
        private quantity: number,
    ) {}
    getId(): Readonly<string> {
        return this.id;
    }
}
