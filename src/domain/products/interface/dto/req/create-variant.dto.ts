import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateVariant {
    @ApiProperty({ example: '500ml', required: true })
    @IsString()
    value: string;
}
