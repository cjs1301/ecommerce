import { ApiResponseProperty } from '@nestjs/swagger';
import { ExchangeStatus } from '@prisma/client';

export class ExchangeRes {
    @ApiResponseProperty()
    status: ExchangeStatus;
    @ApiResponseProperty()
    reason: string;
    @ApiResponseProperty()
    quantity: number;
    @ApiResponseProperty()
    createdAt: Date;
    @ApiResponseProperty()
    updatedAt: Date;
}
