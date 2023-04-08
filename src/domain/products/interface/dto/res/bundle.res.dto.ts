import { ApiProperty } from '@nestjs/swagger';

class BundleItemProductResDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty({ required: false })
    summary?: string | null;
    @ApiProperty()
    available: boolean;
    @ApiProperty()
    price: number;
    @ApiProperty()
    quantity: number;
    @ApiProperty({ required: false })
    meta?: any;
}
class BundleItemResDto {
    @ApiProperty({ type: BundleItemProductResDto })
    product?: BundleItemProductResDto | null;
}

export class BundleResDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    required: boolean;
    @ApiProperty({ type: [BundleItemResDto] })
    items: BundleItemResDto[];
}
