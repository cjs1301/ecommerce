import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateOrderTransaction {
    @ApiProperty({
        description: '결제 내역의 결제 금액입니다.',
        example: 1000,
        required: true,
    })
    @IsNumber()
    paid = 0;

    @ApiProperty({
        description: '결제 내역의 취소 금액입니다.',
        example: 0,
        required: true,
    })
    @IsNumber()
    cancelled = 0;

    @ApiProperty({
        description: '결제 내역의 환불 금액입니다.',
        example: 0,
        required: true,
    })
    @IsNumber()
    refunded = 0;
}
