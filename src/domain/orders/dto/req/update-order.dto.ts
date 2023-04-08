import { OrderStatus, RefundStatus, ExchangeStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrder {
    quantity?: number;
    price?: number;
    request?: string;
    @ApiProperty({ enum: OrderStatus })
    orderStatus?: OrderStatus;
    @ApiProperty({ enum: RefundStatus })
    refundStatus?: RefundStatus;
    @ApiProperty({ enum: ExchangeStatus })
    exchangeStatus?: ExchangeStatus;
    paidAt?: Date;
    receivedAt?: Date;
}
