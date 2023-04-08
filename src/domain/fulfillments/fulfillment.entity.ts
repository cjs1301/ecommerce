import { ApiProperty } from '@nestjs/swagger';
import { FulfillmentStatus } from '@prisma/client';
import { Order } from '../orders/order.entity';

export class Fulfillment {
    @ApiProperty()
    orderId: string;
    @ApiProperty()
    order?: Order;
    @ApiProperty()
    status: FulfillmentStatus;
    @ApiProperty()
    trackingCompany: string;
    @ApiProperty()
    trackingUid: string | null;
    @ApiProperty()
    trackingUrl: string | null;
}
