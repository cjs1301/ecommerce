import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, Max, Min } from 'class-validator';
import { AddCartBundleItem } from './add-bundleItem.dto';
import { CreateCartItemOption } from './create-cart-item-option.dto';

export class AddCartItem {
    @ApiProperty({
        description: '담으려는 카트 품목의 상품입니다.',
        example: 'cl8vnj71k0385n2fnb0l0rpc9',
        required: true,
    })
    @IsString()
    productId: string;

    @ApiProperty({
        description:
            '카트 품목 내에서 같은 상품을 구별하기위한 아이디값입니다.',
        example: '카트 품목 내에서 같은 상품을 구별하기위한 아이디값입니다.',
        required: true,
    })
    @IsString()
    customId: string;

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

    @ApiProperty({
        description: '상품의 옵션들입니다.',
        type: [CreateCartItemOption],
        required: false,
    })
    @IsArray()
    options: CreateCartItemOption[] = [];

    @ApiProperty({
        description: '번들 상품들 입니다.',
        type: [AddCartBundleItem],
        required: false,
    })
    @IsArray()
    bundleItems: AddCartBundleItem[] = [];
}
