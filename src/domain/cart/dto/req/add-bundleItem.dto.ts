import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min, Max } from 'class-validator';

export class AddCartBundleItem {
    @ApiProperty({
        description: '담으려는 카트 품목의 상품입니다.',
        example: 'cl8vnj71k0385n2fnb0l0rpc9',
        required: true,
    })
    @IsString()
    productId: string;
    @ApiProperty({
        description: '담으려는 카트 품목의 수량입니다.',
        example: 1,
        required: true,
        minimum: 1,
        maximum: 100,
    })
    @IsNumber()
    @Min(1, { message: '최소 1이상의 값이 필요합니다.' })
    @Max(100, { message: '100이상 담을수 없습니다.' })
    quantity: number;
}
