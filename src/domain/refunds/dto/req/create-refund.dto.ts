import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, Max, Min } from 'class-validator';

class CreateRefundItemDto {
    @ApiProperty({
        description: '아이템 아이디',
        example: 'cl8vnj71k0385n2fnb0l0rpc9(상품Id x)',
        required: true,
    })
    @IsString()
    itemId: string;

    @ApiProperty({
        description: '아이템의 갯수',
        example: 1,
        required: true,
        minimum: 1,
        maximum: 100,
    })
    @IsNumber()
    @Min(1, { message: '최소 1이상의 값이 필요합니다.' })
    @Max(100, { message: '100이상 담을수 없습니다.' })
    quantity: number;
}

export class CreateRefundDto {
    @ApiProperty({
        description: '환불 내역의 사유입니다.',
        example: '잘못 주문했어요',
        required: false,
    })
    @IsString()
    reason?: string;

    @ApiProperty({
        description: '환불하고자 하는 아이템 정보',
        required: true,
        type: [CreateRefundItemDto],
    })
    @IsArray()
    items: CreateRefundItemDto[];
}
