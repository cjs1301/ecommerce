import { ApiProperty } from '@nestjs/swagger';
import { OrderFulfillmentResDto } from '../../../fulfillments/dto/res/order-fulfillment.res.dto';
import { OrderRefundResDto } from './order-refund.res.dto';
import { OrderExchangeResDto } from '../../../orders/dto/res/order/order-exchange.res.dto';
import { BundleItem } from '../../../products/infra/db/entity/bundleItem.entity';

class RefundProduct {
    @ApiProperty()
    name: string;
}

export class GetRefundForMeResDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    customId: string;
    @ApiProperty({ type: RefundProduct, required: false })
    product?: RefundProduct;
    @ApiProperty({ type: [BundleItem], required: false })
    bundleItems?: BundleItem[];
    @ApiProperty({ type: [OrderFulfillmentResDto], required: false })
    fulfillments?: OrderFulfillmentResDto[];
    @ApiProperty({ type: [OrderRefundResDto], required: false })
    refunds?: OrderRefundResDto[];
    @ApiProperty({ type: [OrderExchangeResDto], required: false })
    exchanges?: OrderExchangeResDto[];
}
