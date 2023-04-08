import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

class Order {
    @ApiProperty()
    orderId: string;

    @ApiProperty({
        description: '배송 업체명 입니다.',
        example: 'CJ대한통운',
        required: true,
    })
    @IsString()
    trackingCompany: string;

    // @ApiProperty({
    //     description: '운송장 번호 입니다.',
    //     example: '433212080045',
    //     required: false,
    // })
    // @IsString()
    // @IsOptional()
    // trackingUid?: string;
    //
    // @ApiProperty({
    //     description: '배송 추적 url입니다',
    //     example: 'https://example.com/433212080045',
    //     required: false,
    // })
    // @IsString()
    // @IsOptional()
    // trackingUrl?: string;
}

export class CreateFulfillments {
    @ApiProperty({ type: [Order] })
    orders: Order[];
}
