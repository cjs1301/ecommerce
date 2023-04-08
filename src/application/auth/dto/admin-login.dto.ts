import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class AdminLoginDto {
    @ApiProperty({ example: 'admin@email.com' })
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({ example: 'qwe123' })
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}
