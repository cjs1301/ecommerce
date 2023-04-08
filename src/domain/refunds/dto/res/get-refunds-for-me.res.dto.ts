/*
 * Order 내부 Item 기준으로 환불된 아이템들에 대한 정보입니다.
 * */
import { ApiProperty } from '@nestjs/swagger';
import { OrderFulfillmentResDto } from '../../../fulfillments/dto/res/order-fulfillment.res.dto';
import { OrderRefundResDto } from './order-refund.res.dto';
import { OrderStatus } from '@prisma/client';

class Transaction {
    @ApiProperty()
    id: string;
    @ApiProperty()
    paid: number;
    @ApiProperty()
    cancelled: number;
    @ApiProperty()
    refunded: number;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
}

class Payment {
    @ApiProperty()
    amount: number;
}
class Product {
    @ApiProperty()
    name: string;
    @ApiProperty()
    price: number;
}

class BundleItem {
    @ApiProperty({ type: Product, required: false })
    product?: Product;
}

class RefundsItem {
    @ApiProperty()
    id: string;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    customId: string;
    @ApiProperty({ type: Product, required: false })
    product?: Product;
    @ApiProperty({ type: [BundleItem], required: false })
    bundleItems?: BundleItem[];
    @ApiProperty({ type: [OrderFulfillmentResDto], required: false })
    fulfillments?: OrderFulfillmentResDto[];
    @ApiProperty({ type: [OrderRefundResDto], required: false })
    refunds?: OrderRefundResDto[];
}

export class GetRefundsForMeResDto {
    @ApiProperty()
    id: string;
    @ApiProperty({ enum: OrderStatus })
    status: OrderStatus;
    @ApiProperty({ type: [RefundsItem] })
    items: RefundsItem[];
    @ApiProperty({ type: Payment })
    payment: Payment;
    @ApiProperty({ type: [Transaction] })
    transactions: Transaction[];
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
}
