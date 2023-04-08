import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CustomerIncludeOption {
    @ApiProperty({
        description: '가상계좌',
        required: false,
        type: 'boolean',
    })
    @IsOptional()
    vbank?: boolean;
}
