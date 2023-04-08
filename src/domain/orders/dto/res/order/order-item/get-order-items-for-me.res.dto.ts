import { ApiProperty } from '@nestjs/swagger';
import { ItemProductRes } from './order-item-product.res.dto';
import { OrderFulfillmentResDto } from '../../../../../fulfillments/dto/res/order-fulfillment.res.dto';
import { OrderRefundResDto } from '../../../../../refunds/dto/res/order-refund.res.dto';
import { OrderExchangeResDto } from '../order-exchange.res.dto';

class BundleItem {
    @ApiProperty()
    id: string;
    @ApiProperty({ type: ItemProductRes, required: false })
    product?: ItemProductRes;
    @ApiProperty()
    quantity: number;
}

export class GetOrderItemsForMeResDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    customId: string;
    @ApiProperty({ type: ItemProductRes, required: false })
    product?: ItemProductRes;
    @ApiProperty({ type: [BundleItem], required: false })
    bundleItems?: BundleItem[];
    @ApiProperty({ type: [OrderFulfillmentResDto], required: false })
    fulfillments?: OrderFulfillmentResDto[];
    @ApiProperty({ type: [OrderExchangeResDto], required: false })
    exchanges?: OrderExchangeResDto[];
}
