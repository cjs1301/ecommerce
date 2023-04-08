import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
class Discount {
    @ApiProperty()
    orderId: string;
    @ApiProperty()
    point: number;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
}
export class CheckoutResDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    customerId: string;
    @ApiProperty()
    price: number;
    @ApiProperty({ type: Discount })
    discount: Discount;
    @ApiProperty({ enum: OrderStatus })
    status: OrderStatus;
    @ApiProperty()
    request: string;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
}
