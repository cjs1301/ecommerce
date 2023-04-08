import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { ShippingAdressResDto } from './shipping-address.res.dto';
import { OrderItemResDto } from './order-item/order-item.res.dto';

export class OrderForMeResDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    price: number;
    @ApiProperty({ required: false })
    request?: string;
    @ApiProperty({ enum: OrderStatus })
    status: OrderStatus;
    @ApiProperty({ type: ShippingAdressResDto })
    shippingAddress?: ShippingAdressResDto;
    @ApiProperty({ type: [OrderItemResDto], required: false })
    items?: OrderItemResDto[];
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
}
