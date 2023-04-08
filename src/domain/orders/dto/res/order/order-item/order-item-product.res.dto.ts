import { ApiProperty } from '@nestjs/swagger';
import { ProductType } from '@prisma/client';

export class ItemProductRes {
    @ApiProperty()
    id: string;
    @ApiProperty({ enum: ProductType })
    type: ProductType;
    @ApiProperty()
    name: string;
    @ApiProperty({ required: false })
    thumbnail: string | null;
    @ApiProperty({ required: false })
    summary: string | null;
    @ApiProperty()
    price: number;
}
