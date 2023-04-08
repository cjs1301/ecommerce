import { ApiProperty } from '@nestjs/swagger';

export class Address {
    @ApiProperty({ example: 'cldiw8q150000lc076hsns8jb', required: true })
    id: string;
    @ApiProperty({ required: true })
    isPrimary: boolean;
    @ApiProperty({ example: '우리집', required: false })
    nickName?: string;
    @ApiProperty({ example: '김고은', required: true })
    payeeName: string;
    @ApiProperty({ example: '00000', required: true })
    postcode: string;
    @ApiProperty({ example: '대한민국', required: true })
    country: string;
    @ApiProperty({ example: '서울특별시', required: true })
    state: string;
    @ApiProperty({ example: '송파구', required: true })
    city: string;
    @ApiProperty({ example: '올림픽로 300', required: true })
    address1: string;
    @ApiProperty({ example: '30층 105호 (주)OOO사무실', required: true })
    address2: string;
    @ApiProperty({ example: '01000000000', required: true })
    mobile: string;
}
