import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { ShippingAdressResDto } from './shipping-address.res.dto';
import { OrderItemResDto } from './order-item/order-item.res.dto';
import { GetOrderItemsForMeResDto } from './order-item/get-order-items-for-me.res.dto';

class Payment {
    @ApiProperty()
    amount: number;
    @ApiProperty({ required: false })
    provider: string | null;
    @ApiProperty({ required: false })
    paidAt: Date | null;
    @ApiProperty({ required: false })
    createdAt: Date | null;
    @ApiProperty({ required: false })
    updatedAt: Date | null;
}

export class GetOrdersForMeResDto {
    @ApiProperty()
    id: string;
    @ApiProperty({ type: Payment, required: false })
    payment?: Payment | null;
    @ApiProperty({ required: false })
    request: string | null;
    @ApiProperty({ enum: OrderStatus })
    status: OrderStatus;
    @ApiProperty({ type: ShippingAdressResDto, required: false })
    shippingAddress?: ShippingAdressResDto | null;
    @ApiProperty({ type: [OrderItemResDto], required: false })
    items?: GetOrderItemsForMeResDto[];
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
}
