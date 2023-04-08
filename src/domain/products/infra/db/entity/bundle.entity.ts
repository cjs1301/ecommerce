import { ProductEntity } from './product.entity';
import { BundleItem } from './bundleItem.entity';

export class Bundle {
    id: string;
    name: string;
    productId: string;
    product?: ProductEntity;
    items?: BundleItem[];
}
