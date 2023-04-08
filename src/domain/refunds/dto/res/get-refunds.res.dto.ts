import { ApiProperty } from '@nestjs/swagger';
import { FulfillmentStatus, OrderStatus, RefundStatus } from '@prisma/client';
import { ShippingAdressResDto } from '../../../orders/dto/res/order/shipping-address.res.dto';

class RefundResDto {
    @ApiProperty()
    id: string;
    @ApiProperty({ enum: RefundStatus })
    status: RefundStatus;
    @ApiProperty({ required: false })
    reason?: string;
    @ApiProperty({ required: false })
    cancelReason?: string;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
}

class FulfillmentResDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    trackingCompany: string;
    @ApiProperty({ required: false })
    trackingUid?: string;
    @ApiProperty({ required: false })
    trackingUrl?: string;
    @ApiProperty()
    quantity: number;
    @ApiProperty({ enum: FulfillmentStatus })
    status: FulfillmentStatus;
    @ApiProperty({ required: false })
    receivedAt?: Date | null;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
}

class RefundItemProductResDto {
    @ApiProperty()
    name: string;
}

class RefundItemResDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    orderId: string;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    customId: string;
    @ApiProperty({ type: RefundItemProductResDto })
    product: RefundItemProductResDto;
    @ApiProperty({ type: [FulfillmentResDto], required: false })
    fulfillments?: FulfillmentResDto[];
    @ApiProperty({ type: [RefundResDto], required: false })
    refunds?: RefundResDto[];
}

export class GetRefundsResDto {
    @ApiProperty()
    id: string;
    @ApiProperty({ enum: OrderStatus })
    status: OrderStatus;
    @ApiProperty({ type: ShippingAdressResDto })
    shippingAddress?: ShippingAdressResDto;
    @ApiProperty({ type: [RefundItemResDto] })
    items?: RefundItemResDto[];
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
}
