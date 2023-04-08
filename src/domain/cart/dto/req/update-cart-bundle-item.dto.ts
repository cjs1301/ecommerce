import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCartBundleItem {
    @ApiProperty()
    @IsString()
    id: string;
    @ApiProperty()
    @IsString()
    @IsOptional()
    productId?: string;
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    quantity?: number;
}
