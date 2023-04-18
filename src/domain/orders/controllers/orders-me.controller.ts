import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { User } from '../../../application/auth/decorators/user.decorator';
import { OrdersService } from '../services/orders.service';
import { PassportUser } from '../../../application/auth/dto/auth.interface';
import { GetOrdersQueryDto } from '../dto/req/get-orders.query.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiMultipleDataResponse,
    ApiSingleDataResponse,
} from '../../../common/decorators/success-res.decorator';
import { GetOrdersForMeResDto } from '../dto/res/order/get-orders-for-me.res.dto';
import { OrderForMeResDto } from '../dto/res/order/order-for-me.res.dto';

@ApiTags('서비스', '주문')
@Controller('me/orders')
@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard('jwt'))
export class OrdersMeController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    @ApiOperation({
        summary: '내 주문 목록',
        description:
            '### 주문 상태 가이드 \n' +
            '\tbeforePayment // 미결제\n' +
            '\toverPaid // 결제 금액 초과\n' +
            '\tunderPaid // 결제 금액 미달\n' +
            '\tpaid // 결제 완료\n' +
            '\n' +
            '\tpartiallyRefunded // 부분 반품 완료\n' +
            '\toverRefunded // 환불 금액 초과\n' +
            '\tunderRefunded // 환불 금액 미달\n' +
            '\n' +
            '\tcancelled // 취소 완료\n' +
            '\tdone // 주문 완료\n',
    })
    @ApiMultipleDataResponse(200, GetOrdersForMeResDto)
    async orderListForMe(
        @User() customer: PassportUser,
        @Query() query: GetOrdersQueryDto,
    ): Promise<GetOrdersForMeResDto[]> {
        return this.ordersService.orderListForMe(customer.id, query);
    }

    @Post(':orderId/cancellation')
    @ApiOperation({
        summary: '내 주문 취소',
        description:
            '본인의 주문을 취소합니다.(송장 번호 발급전 상태까지만 신청 가능하며, 결제된 주문은 환불 처리 됩니다.)' +
            '재고가 원상 복구 됩니다.',
    })
    @ApiSingleDataResponse(201, OrderForMeResDto)
    async orderCancelForMe(
        @Body('reason') reason: string,
        @Param('orderId') orderId: string,
    ) /*: Promise<OrderForMeResDto>*/ {
        return this.ordersService.cancelForMe(orderId, reason);
    }

    @Post(':orderId/received')
    @ApiOperation({
        summary: '내 주문 수령 완료 (수정중)',
        description: '내 주문 상태를 완료됨으로 변경합니다.',
    })
    async orderMarkAsReceived(@Param('orderId') orderId: string) {
        return;
        // return; this.ordersService.orderMarkAsReceived(orderId);
    }
}
