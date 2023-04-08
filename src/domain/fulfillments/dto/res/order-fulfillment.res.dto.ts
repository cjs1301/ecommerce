import { FulfillmentStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class OrderFulfillmentResDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    trackingCompany: string;
    @ApiProperty({ required: false })
    trackingUid?: string | null;
    @ApiProperty({ required: false })
    trackingUrl?: string | null;
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
