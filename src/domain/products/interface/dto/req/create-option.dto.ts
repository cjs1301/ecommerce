import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { CreateVariant } from './create-variant.dto';

export class CreateOptionDto {
    @ApiProperty({ example: '용량', required: true })
    @IsString()
    name: string;
    @ApiProperty({ type: [CreateVariant] })
    @IsArray()
    variations: CreateVariant[];
}
