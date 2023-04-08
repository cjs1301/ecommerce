import { ApiProperty } from '@nestjs/swagger';
import { FulfillmentStatus } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class GetFulfillmentsQueryDto {
    @ApiProperty({
        description: '배송 상태',
        required: false,
        isArray: true,
        type: FulfillmentStatus,
    })
    @IsEnum(FulfillmentStatus, { each: true })
    @IsOptional()
    fulfillmentStatus?: FulfillmentStatus | FulfillmentStatus[]; /*= [
        'pending',
        'shipped',
        'arrived',
    ];*/
}
