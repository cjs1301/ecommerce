import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateCartItem {
    @ApiProperty({
        description: '수정하려는 카트 품목의 수량입니다.',
        example: 1,
        required: false,
        minimum: 1,
        maximum: 100,
    })
    @IsNumber()
    @Min(1, { message: '최소 1이상의 값이 필요합니다.' })
    @Max(100, { message: '100이상 담을수 없습니다.' })
    @IsOptional()
    quantity?: number;

    @ApiProperty({
        description:
            '카트 품목 내에서 같은 상품을 구별하기위한 아이디값입니다.',
        example: 'any string',
        required: false,
    })
    @IsString()
    @IsOptional()
    customId?: string;
}
