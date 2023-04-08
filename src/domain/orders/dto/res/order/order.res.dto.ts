import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { OrderItemResDto } from './order-item/order-item.res.dto';

export class OrderResDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    customerId: string;
    @ApiProperty()
    price: number;
    @ApiProperty({ enum: OrderStatus })
    status: OrderStatus;
    @ApiProperty({ type: [OrderItemResDto] })
    items: OrderItemResDto[];
    @ApiProperty()
    request: string;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
}
