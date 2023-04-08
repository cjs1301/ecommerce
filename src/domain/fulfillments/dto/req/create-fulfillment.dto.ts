import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Item } from '../../../orders/dto/req/item.dto';

export class CreateFulfillment {
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

    @ApiProperty({
        description: '배송내역을 생성 하고자 하는 아이템 정보',
        required: true,
        type: [Item],
    })
    items: Item[];
}
