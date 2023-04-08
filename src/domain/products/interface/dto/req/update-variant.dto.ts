import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateVariant {
    @ApiProperty()
    @IsString()
    id: string;
    @ApiProperty({ description: '옵션 값' })
    @IsString()
    value?: string;
}
