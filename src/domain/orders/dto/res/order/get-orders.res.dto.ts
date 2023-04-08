import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { OrderItemResDto } from './order-item/order-item.res.dto';
import { ShippingAdressResDto } from './shipping-address.res.dto';
import { OrderBundleItemResDto } from './order-item/bundle/order-bundle-item.res.dto';
class CustomerRes {
    @ApiProperty({ example: '홍길동' })
    name: string;
    @ApiProperty({ example: 'abc@email.com' })
    email: string;
    @ApiProperty({ example: '01012341234' })
    mobile: string;
}

export class GetOrdersResDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    price: number;
    @ApiProperty({ required: false })
    request?: string;
    @ApiProperty({ enum: OrderStatus })
    status: OrderStatus;
    @ApiProperty({ type: CustomerRes })
    customer?: CustomerRes;
    @ApiProperty({ type: [OrderBundleItemResDto], required: false })
    bundleItems?: OrderBundleItemResDto[] | [];
    @ApiProperty({ type: ShippingAdressResDto })
    shippingAddress?: ShippingAdressResDto;
    @ApiProperty({ type: [OrderItemResDto] })
    items?: OrderItemResDto[];
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
}
