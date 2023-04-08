import { ApiProperty } from '@nestjs/swagger';
import { FulfillmentStatus } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';
export class UpdateFulfillment {
    @ApiProperty({
        description: '"pending"or"shipped"or"arrived"',
        enum: FulfillmentStatus,
        required: true,
        example: 'shipped',
    })
    @IsEnum(FulfillmentStatus)
    status: FulfillmentStatus;

    @ApiProperty({
        description: '배송 업체명 입니다.',
        example: 'CJ대한통운',
        required: false,
    })
    @IsString()
    @IsOptional()
    trackingCompany?: string;

    @ApiProperty({
        description: '운송장 번호 입니다.',
        example: '433212080045',
        required: false,
    })
    @IsString()
    @IsOptional()
    trackingUid?: string;

    @ApiProperty({
        description: '배송 추적 url입니다',
        example: 'https://example.com/433212080045',
        required: false,
    })
    @IsString()
    @IsOptional()
    trackingUrl?: string;
}
