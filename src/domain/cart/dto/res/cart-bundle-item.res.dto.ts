import { ApiProperty } from '@nestjs/swagger';

class BundleItemProductResDto {
    @ApiProperty({ example: 'cldt334fa0007fnn5f1i0uexw' })
    id: string;
    @ApiProperty({ example: '수분보습 부스터 샷 고농도' })
    name: string;
    @ApiProperty({ example: '0' })
    price: number;
}

export class CartBundleItemResDto {
    @ApiProperty({ example: 'cldt334fa0007fnn5f1i0uexw' })
    id: string;
    @ApiProperty({ example: 3 })
    quantity: number;
    @ApiProperty({ type: BundleItemProductResDto })
    product: BundleItemProductResDto | null;
}
