import { ApiProperty } from '@nestjs/swagger';
import { BundleItem } from '../products/infra/db/entity/bundleItem.entity';
import { Variant } from '../products/infra/db/entity/variant.entity';
import { ProductEntity } from '../products/infra/db/entity/product.entity';
import { Cart } from './cart.entity';

export class CartOnProduct {
    @ApiProperty()
    id: string;
    @ApiProperty()
    cartId: string;
    @ApiProperty()
    cart?: Cart;
    @ApiProperty()
    productId: string;
    @ApiProperty()
    product?: ProductEntity;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    variantId: string;
    @ApiProperty()
    variant?: Variant;
    @ApiProperty()
    bundleItems?: BundleItem[];
}
