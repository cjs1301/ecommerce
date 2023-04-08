import { ApiProperty } from '@nestjs/swagger';
import { OrderBundleItemProductResDto } from './order-bundle-item-product.res.dto';

export class OrderBundleItemResDto {
    @ApiProperty({ type: OrderBundleItemProductResDto })
    product: OrderBundleItemProductResDto;
    @ApiProperty()
    quantity: number;
}
