import { ApiProperty } from '@nestjs/swagger';
import { ExchangeStatus } from '@prisma/client';

export class OrderExchangeResDto {
    @ApiProperty()
    id: string;
    @ApiProperty({ enum: ExchangeStatus })
    status: ExchangeStatus;
    @ApiProperty({ required: false })
    reason?: string;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
}
