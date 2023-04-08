import { FulfillmentStatus } from '@prisma/client';
import { FulfillmentItemResDto } from './fulfillment-item.res.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetFulfillmentsResDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    itemId: string;
    @ApiProperty({ type: FulfillmentItemResDto })
    item: FulfillmentItemResDto;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    status: FulfillmentStatus;
    @ApiProperty()
    trackingCompany: string;
    @ApiProperty({ required: false })
    trackingUid?: string | null;
    @ApiProperty({ required: false })
    trackingUrl?: string | null;
    @ApiProperty({ required: false })
    receivedA?: Date | null;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
}
