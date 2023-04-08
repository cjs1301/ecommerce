import { ApiProperty } from '@nestjs/swagger';
import { RefundStatus } from '@prisma/client';

export class OrderRefundResDto {
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
