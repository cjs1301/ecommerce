import { Order } from './order.entity';
import { ProductEntity } from '../products/infra/db/entity/product.entity';
import { Variant } from '../products/infra/db/entity/variant.entity';
import { BundleItem } from '../products/infra/db/entity/bundleItem.entity';

export class OrderOnProduct {
    id: string;
    orderId: string;
    order?: Order;
    productId: string;
    product?: ProductEntity;
    quantity: number;
    variantId: string;
    variant?: Variant;
    bundleItems?: BundleItem[];
}
