import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
} from 'class-validator';
import { CreateOrderOnProduct } from '../../../orders/dto/req/create-order-on-product.dto';
import { CreateShippingAdress } from '../../../orders/dto/req/create-shipping-address.dto';
export class CheckoutReqDto {
    @ApiProperty({
        description: '주문에 사용할 카트 품목 목록입니다.',
        required: true,
        type: [CreateOrderOnProduct],
    })
    @IsArray()
    items: CreateOrderOnProduct[] = [];

    @ApiProperty({
        description: '주문에 사용할 배송지 주소 정보입니다.',
        required: true,
        type: CreateShippingAdress,
    })
    @IsObject()
    shippingAddress: CreateShippingAdress;

    @ApiProperty({
        description: '주문의 요청 사항입니다.',
        example: '문앞에 놔둬 주세요',
        required: false,
    })
    @IsString()
    @IsOptional()
    request?: string;

    @ApiProperty()
    @IsNumber()
    usePoint: number;
}
