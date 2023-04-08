import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateVariantDto {
    @ApiProperty()
    @IsString()
    id: string;
    @ApiProperty({ description: '옵션 값' })
    @IsString()
    value: string;
}
