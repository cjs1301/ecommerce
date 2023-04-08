import { IsArray, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteCartItemQueryDto {
    @IsArray()
    @ApiProperty({ required: false, type: Array<string> })
    @IsOptional()
    itemId?: string[];
}
