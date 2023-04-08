import { ApiResponseProperty } from '@nestjs/swagger';
import { RefundStatus } from '@prisma/client';

export class refundRes {
    @ApiResponseProperty()
    status: RefundStatus;
    @ApiResponseProperty()
    reason: string;
    @ApiResponseProperty()
    cancelReason: string;
    @ApiResponseProperty()
    quantity: number;
    @ApiResponseProperty()
    createdAt: Date;
    @ApiResponseProperty()
    updatedAt: Date;
}
