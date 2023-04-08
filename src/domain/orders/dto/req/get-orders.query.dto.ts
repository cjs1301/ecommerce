import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { FulfillmentStatus, OrderStatus, RefundStatus } from '@prisma/client';

export class GetOrdersQueryDto {
    @ApiProperty({
        description: '주문의 상태',
        required: false,
        isArray: true,
        type: OrderStatus,
    })
    @IsEnum(OrderStatus, { each: true })
    @IsOptional()
    status?: OrderStatus | OrderStatus[]; /*= [
        'paid',
        'beforePayment',
        'cancelled',
        'overPaid',
        'overRefunded',
        'partiallyRefunded',
        'underPaid',
        'underRefunded',
        'done',
    ];*/
}
