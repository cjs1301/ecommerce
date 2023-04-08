import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { RefundStatus } from '@prisma/client';

export class GetRefundsQueryDto {
    @ApiProperty({
        description: '환불 상태',
        required: false,
        isArray: true,
        type: RefundStatus,
    })
    @IsEnum(RefundStatus, { each: true })
    @IsOptional()
    refundStatus?: RefundStatus | RefundStatus[]; /*= [
        'accepted',
        'cancelled',
        'requested',
        'return',
    ];*/
}
