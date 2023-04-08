import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsOptional,
    IsPhoneNumber,
    IsPostalCode,
    IsString,
} from 'class-validator';

export class CreateAddress {
    @ApiProperty({
        description: '대표 배송지 여부 입니다.',
        example: false,
        required: true,
    })
    @IsBoolean()
    isPrimary: boolean;

    @ApiProperty({
        description: '배송지 별명입니다.',
        example: '우리집',
        required: false,
    })
    @IsString()
    @IsOptional()
    nickName?: string;

    @ApiProperty({
        description: '수취인의 성명입니다.',
        example: '김고은',
        required: true,
    })
    @IsString()
    payeeName: string;

    @ApiProperty({
        description: '우편번호 입니다.',
        example: '00000',
        required: true,
    })
    @IsPostalCode('any')
    postcode: string;

    @ApiProperty({
        description: '고객의 국가입니다.',
        example:
            '대한민국 (옵션입니다 입력하지 않으면 대한민국으로 입력됩니다.)',
        required: false,
    })
    @IsString()
    @IsOptional()
    country = '대한민국';

    @ApiProperty({
        description: '주소의 도 (주)입니다.',
        example: '서울특별시 | 경기도',
        required: true,
    })
    @IsString()
    state: string;

    @ApiProperty({
        description: '주소의 시입니다.',
        example: '송파구 | 성남시 | 경주시',
        required: true,
    })
    @IsString()
    city: string;

    @ApiProperty({
        description: '주소의 상세 주소 1입니다.',
        example: '올림픽로 300 | 정자일로 100',
        required: true,
    })
    @IsString()
    address1: string;

    @ApiProperty({
        description: '주소의 상세 주소 2입니다.',
        example: '30층 105호 (주)OOO사무실 | O동 O호 경비실 앞',
        required: true,
    })
    @IsString()
    address2: string;

    @ApiProperty({
        description: '수취인의 무선번호(핸드폰)입니다.',
        example: '010-0000-0000',
        required: true,
    })
    @IsPhoneNumber('KR')
    mobile: string;
}
