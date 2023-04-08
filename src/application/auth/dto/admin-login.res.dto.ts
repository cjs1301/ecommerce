import { ApiProperty } from '@nestjs/swagger';

export class AdminLoginResDto {
    @ApiProperty({ example: 'jwt token code' })
    accessToken: string;
}
