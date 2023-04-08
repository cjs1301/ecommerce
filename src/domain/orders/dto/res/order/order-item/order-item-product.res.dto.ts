import { ApiProperty } from '@nestjs/swagger';

export class ItemProductRes {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty({ required: false })
    thumbnail: string | null;
    @ApiProperty({ required: false })
    summary: string | null;
    @ApiProperty()
    price: number;
}
