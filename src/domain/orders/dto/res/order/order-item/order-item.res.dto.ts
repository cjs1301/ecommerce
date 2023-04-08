import { ItemProductRes } from './order-item-product.res.dto';
import { ApiProperty } from '@nestjs/swagger';
import { OrderFulfillmentResDto } from '../../../../../fulfillments/dto/res/order-fulfillment.res.dto';
import { OrderRefundResDto } from '../../../../../refunds/dto/res/order-refund.res.dto';
import { OrderExchangeResDto } from '../order-exchange.res.dto';

export class OrderItemResDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    orderId: string;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    customId: string;
    @ApiProperty({ type: ItemProductRes })
    product: ItemProductRes | null;
    @ApiProperty({ type: OrderFulfillmentResDto, required: false })
    fulfillment?: OrderFulfillmentResDto | null;
    @ApiProperty({ type: OrderRefundResDto, required: false })
    refund?: OrderRefundResDto | null;
    @ApiProperty({ type: OrderExchangeResDto, required: false })
    exchange?: OrderExchangeResDto | null;
}
