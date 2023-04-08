import { Gender } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Customer {
    @ApiProperty({ example: 'clbenjsic00002b01osmov6lj' })
    id: string;
    @ApiProperty({ example: 'kakao_2393526857', required: false })
    kakaoId?: string | null;
    @ApiProperty({ example: null, required: false })
    naverId?: string | null;
    @ApiProperty({ example: null, required: false })
    appleId?: string | null;
    @ApiProperty({ example: null, required: false })
    googleId?: string | null;
    @ApiProperty({ example: 'abc@kakao.com' })
    email: string;
    @ApiProperty({ example: '홍길동', required: false })
    name?: string | null;
    @ApiProperty({ example: 'male', required: false })
    gender?: Gender | null;
    @ApiProperty({ example: null, required: false })
    birthyear?: Date | null;
    @ApiProperty({ example: '01012341234', required: false })
    mobile?: string | null;
    @ApiProperty()
    point: number;
    @ApiProperty({ example: true })
    isActive: boolean;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
}
