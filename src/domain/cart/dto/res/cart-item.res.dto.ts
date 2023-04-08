import { ApiProperty } from '@nestjs/swagger';
import { CartBundleItemResDto } from './cart-bundle-item.res.dto';
import { DiscountType } from '@prisma/client';
class AddCartItemProductResDto {
    @ApiProperty({ example: 'cldt334fa0007fnn5f1i0uexw' })
    id: string;
    @ApiProperty({ example: '개인화 화장품(테스트)' })
    name: string;
    @ApiProperty({ required: false })
    summary?: string;
    @ApiProperty()
    price: number;
    @ApiProperty({ enum: DiscountType, required: false })
    discountType?: DiscountType;
    @ApiProperty({ required: false })
    discountValue?: number;
}

export class CartItemResDto {
    @ApiProperty({ example: 'cldt334fa0007fnn5f1i0uexw' })
    id: string;
    @ApiProperty({ example: 3 })
    quantity: number;
    @ApiProperty({ example: 'rendn' })
    customId: string;
    @ApiProperty({ type: [CartBundleItemResDto], required: false })
    bundleItems?: CartBundleItemResDto[];
    @ApiProperty({ required: false })
    options?: any[];
    @ApiProperty({ type: AddCartItemProductResDto })
    product: AddCartItemProductResDto;
    @ApiProperty()
    addedAt: Date;
}
