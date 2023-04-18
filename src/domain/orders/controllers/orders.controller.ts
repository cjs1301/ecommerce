import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { UpdateOrderTransaction } from '../dto/req/update-order-transaction.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetOrdersQueryDto } from '../dto/req/get-orders.query.dto';
import { Roles } from '../../../application/auth/decorators/roles.decorator';
import { Role } from '../../../application/auth/dto/role.enum';
import { GetOrdersResDto } from '../dto/res/order/get-orders.res.dto';
import {
    ApiMultipleDataResponse,
    ApiSingleDataResponse,
} from '../../../common/decorators/success-res.decorator';
import { JwtAuthGuard } from '../../../application/auth/guard/jwt.guard';
import { RolesGuard } from '../../../application/auth/guard/roles.guard';
import { GetOrderResDto } from '../dto/res/order/get-order.res.dto';

@ApiTags('주문')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @ApiTags('서비스')
    @Put(':orderId/transactions')
    @ApiOperation({
        summary: '주문의 거래 내역을 동기화하고 매뉴얼하게 수정합니다.',
        description: '아임포트의 결제 내역들을 주문 상태에 반영합니다',
    })
    async orderTransaction(
        @Param('orderId') orderId: string,
        @Body() updateOrderTransaction: UpdateOrderTransaction,
    ) {
        return this.ordersService.orderTransaction(
            orderId,
            updateOrderTransaction,
        );
    }

    @ApiTags('어드민')
    @ApiBearerAuth('accessToken')
    @Roles(Role.Master, Role.Manager)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    @ApiOperation({
        summary: '주문의 목록',
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
            '\tdone // 주문 완료',
    })
    @ApiMultipleDataResponse(200, GetOrdersResDto)
    async getOrders(
        @Query() queryOptions: GetOrdersQueryDto,
    ): Promise<GetOrdersResDto[]> {
        return this.ordersService.getOrders(queryOptions);
    }

    @ApiTags('어드민')
    @ApiBearerAuth('accessToken')
    @Roles(Role.Master, Role.Manager)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth('accessToken')
    @ApiSingleDataResponse(200, GetOrderResDto)
    @Get(':orderId')
    @ApiOperation({
        summary: '주문 상세',
        description: '주문 하나를 가져옵니다.',
    })
    async getOrder(@Param('orderId') orderId: string): Promise<GetOrderResDto> {
        return this.ordersService.getOrder(orderId);
    }

    @ApiTags('어드민')
    @ApiBearerAuth('accessToken')
    @Roles(Role.Master, Role.Manager)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':orderId')
    @ApiOperation({
        summary: '주문 삭제',
        description: '주문 목록을 가져옵니다.',
    })
    async deleteOrder(@Param('orderId') orderId: string) {
        return this.ordersService.deleteOrder(orderId);
    }

    @ApiTags('어드민')
    @ApiBearerAuth('accessToken')
    @Roles(Role.Master, Role.Manager)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post(':orderId/received')
    @ApiOperation({
        summary: '주문 수령 완료(수정중)',
        description: '주문 상태를 완료됨으로 변경합니다.',
    })
    async orderMarkAsReceived(@Param('orderId') orderId: string) {
        return; // this.ordersService.orderMarkAsReceived(orderId);
    }
}
