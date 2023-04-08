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
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { CreateFulfillment } from '../dto/req/create-fulfillment.dto';
import { UpdateFulfillment } from '../dto/req/update-fullfillment.dto';
import { FulfillmentRes } from '../dto/res/fulfillment.res.dto';
import { Roles } from '../../../core/common/decorators/roles.decorator';
import { Role } from '../../../application/auth/dto/role.enum';
import { JwtAuthGuard } from '../../../application/auth/guard/jwt.guard';
import { RolesGuard } from '../../../application/auth/guard/roles.guard';
import { CreateFulfillments } from '../dto/req/create-fulfillments.dto';
import { FulfillmentService } from '../services/fulfillment.service';
import { ApiMultipleDataResponse } from '../../../core/common/decorators/success-res.decorator';
import { GetFulfillmentsQueryDto } from '../dto/req/get-fulfillments.query.dto';
import { GetFulfillmentsResDto } from '../dto/res/get-fulfillments.res.dto';

@ApiTags('어드민', '배송')
@ApiBearerAuth('accessToken')
@Roles(Role.Master, Role.Manager)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class FulfillmentController {
    constructor(private readonly fulfillmentService: FulfillmentService) {}

    @Get('fulfillments')
    @ApiOperation({
        summary: '배송 목록',
        description:
            '### 배송 상태 가이드 \n' +
            '\tpending // 배송 대기\n' +
            '\tshipped // 배송 출고\n' +
            '\tarrived // 배송 도착\n',
    })
    @ApiMultipleDataResponse(200, GetFulfillmentsResDto)
    async getFulfillments(
        @Query() query: GetFulfillmentsQueryDto,
    ): Promise<GetFulfillmentsResDto[]> {
        return this.fulfillmentService.getFulfillments(query);
    }

    @Post('orders/:orderId/fulfillments')
    @ApiOperation({
        summary: '주문 배송 이행 내역 생성(주문내 item 단위 배송 내역 생성)',
        description:
            '생성시 배송 상태는 "pending" 배송 대기 상태로 설정 됩니다.  </br>' +
            '주문 상태가 paid인 것만 배송 대기(pending)으로 설정 가능합니다.  </br>' +
            '배송 내역 생성시 물품 재고가 차감 됩니다.',
    })
    async orderCreateFulfillment(
        @Param('orderId') orderId: string,
        @Body() body: CreateFulfillment,
    ) {
        return this.fulfillmentService.orderCreateFulfillment(orderId, body);
    }

    @Post('fulfillments')
    @ApiOperation({
        summary: '여러 주문 배송 이행 내역 생성',
        description:
            '생성시 배송 상태는 "pending" 배송 대기 상태로 설정 됩니다.  </br>' +
            '주문 상태가 paid인 것만 배송 대기(pending)으로 설정 가능합니다.  </br>',
    })
    async orderCreateFulfillments(@Body() body: CreateFulfillments) {
        return this.fulfillmentService.orderCreateFulfillments(body);
    }

    @Put('fulfillments/:fulfillmentId')
    @ApiOperation({
        summary: '주문 배송 이행 내역 수정',
        description: '배송 이행 내역을 수정합니다.',
    })
    @ApiResponse({
        status: 200,
        type: FulfillmentRes,
    })
    async orderUpdateFulfillment(
        @Param('fulfillmentId') fulfillmentId: string,
        @Body() body: UpdateFulfillment,
    ) {
        return this.fulfillmentService.orderUpdateFulfillment(
            fulfillmentId,
            body,
        );
    }

    @Delete('fulfillments/:fulfillmentId')
    @ApiOperation({
        summary: '주문 배송 이행 내역 삭제',
        description: '배송 이행 내역을 삭제합니다.',
    })
    @ApiResponse({
        status: 200,
        type: FulfillmentRes,
    })
    async orderDeleteFulfillment(
        @Param('fulfillmentId') fulfillmentId: string,
    ) {
        return this.fulfillmentService.orderDeleteFulfillment(fulfillmentId);
    }
}
