import { ItemProductRes } from './order-item-product.res.dto';
import { ApiProperty } from '@nestjs/swagger';
import { OrderFulfillmentResDto } from '../../../../../fulfillments/dto/res/order-fulfillment.res.dto';
import { OrderRefundResDto } from '../../../../../refunds/dto/res/order-refund.res.dto';
import { OrderExchangeResDto } from '../order-exchange.res.dto';

export class GetItemsForMeResDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    customId: string;
    @ApiProperty({ type: ItemProductRes })
    product: ItemProductRes;
    @ApiProperty({ type: [OrderFulfillmentResDto], required: false })
    fulfillments?: OrderFulfillmentResDto[];
    @ApiProperty({ type: [OrderRefundResDto], required: false })
    refunds?: OrderRefundResDto[];
    @ApiProperty({ type: [OrderExchangeResDto], required: false })
    exchanges?: OrderExchangeResDto[];
}
