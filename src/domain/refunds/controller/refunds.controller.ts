import {
    Controller,
    Put,
    Param,
    Post,
    Get,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '@application/auth/decorators/roles.decorator';
import { Role } from '@application/auth/dto/role.enum';
import { JwtAuthGuard } from '@application/auth/guard/jwt.guard';
import { RolesGuard } from '@application/auth/guard/roles.guard';
import { GetRefundsQueryDto } from '../dto/req/get-refunds.query.dto';
import { RefundsService } from '../services/refunds.service';
import { ApiMultipleDataResponse } from '@common/decorators/success-res.decorator';
import { GetRefundsResDto } from '../dto/res/get-refunds.res.dto';

@ApiTags('어드민', '환불')
@ApiBearerAuth('accessToken')
@Roles(Role.Master, Role.Manager)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('order')
export class RefundsController {
    constructor(private readonly refundsService: RefundsService) {}

    @Get('refunds')
    @ApiOperation({
        summary: '환불 목록',
        description: '',
    })
    @ApiMultipleDataResponse(200, GetRefundsResDto)
    async getRefunds(
        @Query() query: GetRefundsQueryDto,
    ) /*: Promise<GetRefundsResDto[]>*/ {
        return this.refundsService.getRefunds(query);
    }

    @Post('refund/:refundId/accepted')
    @ApiOperation({
        summary: '환불 승인',
        description:
            '요청된 환불 내역을 승인합니다.(실제 환불은 포트원 관지자 페이지에서 해야합니다)',
    })
    async acceptRefund(@Param('refundId') refundId: string) {
        return this.refundsService.acceptRefund(refundId);
    }

    @Put('refund/:refundId/return')
    @ApiOperation({
        summary: '환불 요청 반려',
        description: '환불 요청을 반려 합니다.',
    })
    async unAcceptRefund(@Param('refundId') refundId: string) {
        return this.refundsService.unAcceptRefund(refundId);
    }
}
