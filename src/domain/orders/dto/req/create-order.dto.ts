import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';
import { CreateOrderOnProduct } from './create-order-on-product.dto';
import { CreateShippingAdress } from './create-shipping-address.dto';
import { OrderStatus } from '@prisma/client';

export class CreateOrder {
    @ApiProperty({ type: [CreateOrderOnProduct] })
    @IsArray()
    @ArrayMinSize(1, { message: '최소 1개이상의 아이템을 넣으셔야 합니다.' })
    items: CreateOrderOnProduct[];

    @ApiProperty({ type: OrderStatus })
    status: OrderStatus;

    @ApiProperty({
        description: '주문에 사용할 배송지 주소 정보입니다.',
        required: true,
        type: CreateShippingAdress,
    })
    shippingAddress: CreateShippingAdress;

    @ApiProperty()
    @IsString()
    @IsOptional()
    request?: string;

    @ApiProperty()
    usePoint: number;
}
