import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { UpdateVariant } from './update-variant.dto';

export class UpdateOption {
    @ApiProperty({ description: '옵션 아이디' })
    @IsString()
    id: string;
    @ApiProperty({ description: '옵션 이름' })
    @IsString()
    name: string;
    @ApiProperty({ type: [UpdateVariant] })
    @IsArray()
    variations: UpdateVariant[];
}
