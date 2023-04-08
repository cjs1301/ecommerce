import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateOrderBundleItem {
    @ApiProperty()
    @IsString()
    productId: string;
    @ApiProperty()
    @IsNumber()
    quantity: number;
}
