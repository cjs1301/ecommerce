import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiMultipleDataResponse,
    ApiSingleDataResponse,
} from '../../../common/decorators/success-res.decorator';
import { User } from '../../../application/auth/decorators/user.decorator';
import { PassportUser } from '../../../application/auth/dto/auth.interface';
import { GetRefundsForMeResDto } from '../dto/res/get-refunds-for-me.res.dto';
import { GetRefundsQueryDto } from '../dto/req/get-refunds.query.dto';
import { CreateRefundDto } from '../dto/req/create-refund.dto';
import { OrderRefundResDto } from '../dto/res/order-refund.res.dto';
import { RefundsService } from '../services/refunds.service';

@ApiTags('서비스', '환불')
@Controller('me/order')
@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard('jwt'))
export class RefundsMeController {
    constructor(private refundsService: RefundsService) {}

    @Get('refunds')
    @ApiOperation({
        summary: '내 환불 목록',
        description:
            '### 환불 상태 가이드 \n' +
            '\trequested // 반품 요청\n' +
            '\tcancelled // 반품 취소\n' +
            '\taccepted // 반품 승인\n' +
            '\treturn // 반품 신청 반려\n',
    })
    @ApiMultipleDataResponse(200, GetRefundsForMeResDto)
    async getRefundListForMe(
        @User() customer: PassportUser,
        @Query() query: GetRefundsQueryDto,
    ) /*: Promise<GetRefundsForMeResDto[]>*/ {
        return this.refundsService.getRefundsForMe(customer.id, query);
    }

    @Get('refund/:refundId')
    @ApiOperation({
        summary: '내 환불 상세(수정중)',
    })
    // @ApiSingleDataResponse(200, GetRefundForMeResDto)
    async getRefundForMe(
        @User() customer: PassportUser,
        @Param('refundId') refundId: string,
    ) /*: Promise<GetRefundForMeResDto> */ {
        return this.refundsService.getRefundForMe(refundId);
    }

    @Post(':orderId/refund')
    @ApiOperation({
        summary: '내 주문 환불 신청',
        description: '본인의 주문에 대해 환불을 요청합니다.',
    })
    // @ApiSingleDataResponse(201, OrderForMeResDto)
    async requestRefundForMe(
        @Body() body: CreateRefundDto,
        @Param('orderId') orderId: string,
    ) /*: Promise<OrderForMeResDto>*/ {
        return this.refundsService.requestRefundForMe(orderId, body);
    }

    @Post('refund/:refundId/cancellation')
    @ApiOperation({
        summary: '내 주문 환불 신청 취소',
        description: '본인의 주문에 대해 환불을 요청을 취소합니다.',
    })
    @ApiSingleDataResponse(201, OrderRefundResDto)
    async cancelRefundForMe(
        @Body('reason') reason: string | null,
        @Param('refundId') refundId: string,
    ) /*: Promise<OrderRefundResDto>*/ {
        return this.refundsService.cancelRefundForMe(refundId, reason || '');
    }
}
