import { OrderStatus, RefundStatus, ExchangeStatus } from '@prisma/client';
import { OrderOnProduct } from './orderOnProduct.entity';
import { Fulfillment } from '../fulfillments/fulfillment.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Order {
    @ApiProperty()
    id: number;
    @ApiProperty()
    customerId: string;
    @ApiProperty()
    items?: OrderOnProduct[];
    @ApiProperty()
    price: number;
    @ApiProperty()
    address: string;
    @ApiProperty()
    request: string | null;
    @ApiProperty()
    fulfillment?: Fulfillment | null;
    @ApiProperty()
    orderStatus: OrderStatus;
    @ApiProperty()
    refundStatus: RefundStatus | null;
    @ApiProperty()
    exchangeStatus: ExchangeStatus | null;
    @ApiProperty()
    paidAt: Date | null;
    @ApiProperty()
    receivedAt: Date | null;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
}
