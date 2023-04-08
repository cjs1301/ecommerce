import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsOptional,
    IsPhoneNumber,
    IsPostalCode,
    IsString,
} from 'class-validator';

export class UpdateAddress {
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
        required: false,
    })
    @IsString()
    @IsOptional()
    payeeName?: string;

    @ApiProperty({
        description: '우편번호 입니다.',
        example: '00000',
        required: false,
    })
    @IsPostalCode('any')
    @IsOptional()
    postcode?: string;

    @ApiProperty({
        description: '고객의 국가입니다.',
        example: '대한민국',
        required: false,
    })
    @IsString()
    @IsOptional()
    country?: string;

    @ApiProperty({
        description: '주소의 도 (주)입니다.',
        example: '서울특별시 | 경기도',
        required: false,
    })
    @IsString()
    @IsOptional()
    state?: string;

    @ApiProperty({
        description: '주소의 시입니다.',
        example: '송파구 | 성남시 | 경주시',
        required: false,
    })
    @IsString()
    @IsOptional()
    city?: string;

    @ApiProperty({
        description: '주소의 상세 주소 1입니다.',
        example: '올림픽로 300 | 정자일로 100',
        required: false,
    })
    @IsString()
    @IsOptional()
    address1?: string;

    @ApiProperty({
        description: '주소의 상세 주소 2입니다.',
        example: '30층 105호 (주)OOO사무실 | O동 O호 경비실 앞',
        required: false,
    })
    @IsString()
    @IsOptional()
    address2?: string;

    @ApiProperty({
        description: '수취인의 무선번호(핸드폰)입니다.',
        example: '010-0000-0000',
        required: false,
    })
    @IsPhoneNumber('KR')
    @IsOptional()
    mobile?: string;

    @ApiProperty({
        description: '주소의 유선번호 (전화)입니다.',
        example: '000-0000-0000',
        required: false,
    })
    @IsString()
    @IsOptional()
    phone?: string;
}
