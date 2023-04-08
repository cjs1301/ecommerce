import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
} from 'class-validator';
import { CreateOrderBundleItem } from './create-order-bundle-item.dto';
import { CreateOrderItemOption } from './create-order-item-option.dto';

export class CreateOrderOnProduct {
    @ApiProperty({
        description: '담으려는 주문 품목의 상품입니다.',
        example: 'cl8vnj71k0385n2fnb0l0rpc9',
        required: true,
    })
    @IsString()
    productId: string;

    @ApiProperty({
        description: '담으려는 주문 품목의 수량입니다.',
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
        description:
            '주문 품목 내에서 같은 상품을 구별하기위한 아이디값입니다.',
        example: 'any string',
        required: true,
    })
    @IsString()
    customId: string;

    @ApiProperty({
        description: '주문에 사용할 카트 품목의 추가 구매 품목 목록입니다.',
        type: [CreateOrderBundleItem],
    })
    @IsArray()
    @IsOptional()
    bundleItems: CreateOrderBundleItem[] = [];

    @ApiProperty({
        description: '주문에 사용할 카트 품목의 옵션 목록입니다.',
        type: [CreateOrderItemOption],
    })
    @IsArray()
    @IsOptional()
    options: CreateOrderItemOption[] = [];
}
