import { ApiProperty } from '@nestjs/swagger';
import { DiscountType } from '@prisma/client';
import { CartBundleItemResDto } from './cart-bundle-item.res.dto';

class CartItemProductResDto {
    @ApiProperty({ example: 'cldt334fa0007fnn5f1i0uexw' })
    id: string;
    @ApiProperty({ example: '개인화 화장품(테스트)' })
    name: string;
    @ApiProperty({ example: '이미지 url' })
    thumbnail: string;
    @ApiProperty({ required: false })
    summary: string;
    @ApiProperty()
    price: number;
    @ApiProperty({ enum: DiscountType, required: false })
    discountType: DiscountType;
    @ApiProperty({ required: false })
    discountValue: number;
}

export class CartItemsResDto {
    @ApiProperty({ example: 'itemId' })
    id: string;
    @ApiProperty({ type: CartItemProductResDto })
    product: CartItemProductResDto;
    @ApiProperty({ required: false })
    options?: any[];
    @ApiProperty({ type: [CartBundleItemResDto], required: false })
    bundleItems?: CartBundleItemResDto[];
    @ApiProperty()
    customId: string;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    addedAt: Date;
}
