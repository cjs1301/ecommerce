import { Gender } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsDate,
    IsEmail,
    IsEnum,
    IsOptional,
    IsPhoneNumber,
    IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCustomer {
    @ApiProperty({
        description: '이메일 입니다',
        example: 'example@example.com',
        required: false,
    })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({ example: '김범수', required: false })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ example: 'male | female', enum: Gender, required: false })
    @IsEnum(Gender)
    @IsOptional()
    gender?: Gender;

    @ApiProperty({ required: false })
    @IsDate()
    @Transform(({ value }) => new Date(value))
    @IsOptional()
    birthyear?: Date;

    @ApiProperty({ example: '01012341234', required: false })
    @IsPhoneNumber('KR')
    @IsOptional()
    mobile?: string;

    @ApiProperty({ required: false })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
