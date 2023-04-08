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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PassportUser } from '@application/auth/dto/auth.interface';

import { CreateAddress } from '../dto/req/create-address.dto';
import { UpdateCustomer } from '../dto/req/update-customer.dto';
import { CustomersService } from '../services/customers.service';
import { UpdateAddress } from '../dto/req/update-address.dto';
import { CustomerIncludeOption } from '../dto/req/query-customer.dto';
import { JwtAuthGuard } from '@application/auth/guard/jwt.guard';
import {
    ApiMultipleDataResponse,
    ApiSingleDataResponse,
} from '@common/decorators/success-res.decorator';
import { CustomerResDto } from '../dto/res/customer.res.dto';
import { Customer } from '../customer.entity';
import { AddressResDto } from '../dto/res/address.res.dto';
import { User } from '@application/auth/decorators/user.decorator';

@ApiTags('서비스')
@Controller('me')
@ApiBearerAuth('accessToken')
@UseGuards(JwtAuthGuard)
export class CustomersMeController {
    constructor(private readonly customersService: CustomersService) {}

    @Get('')
    @ApiOperation({
        summary: '내 정보 보기',
        description: '로그인된 고객을 가져옵니다.',
    })
    @ApiSingleDataResponse(200, CustomerResDto)
    async getMe(
        @User() user: PassportUser,
        @Query() include: CustomerIncludeOption,
    ): Promise<CustomerResDto> {
        return await this.customersService.getCustomer(user.id, include);
    }

    @Put('')
    @ApiOperation({
        summary: '내 정보 수정',
        description: '로그인된 고객을 수정합니다.',
    })
    @ApiSingleDataResponse(200, Customer)
    async updateMe(
        @User() user: PassportUser,
        @Body() body: UpdateCustomer,
    ): Promise<Customer> {
        return await this.customersService.updateMe(user.id, body);
    }

    @Post('address')
    @ApiOperation({
        summary: '내 주소지 추가',
        description: '로그인된 고객의 주소지를 생성합니다.',
    })
    @ApiSingleDataResponse(201, AddressResDto)
    async createAddress(
        @User() user: PassportUser,
        @Body() body: CreateAddress,
    ) /*: Promise<AddressResDto>*/ {
        return this.customersService.createAddress(user.id, body);
    }

    @Get('address')
    @ApiMultipleDataResponse(200, AddressResDto)
    @ApiOperation({
        summary: '내 주소지 조회',
        description: '로그인된 고객의 주소지를 가져옵니다.',
    })
    async getAddress(
        @User() user: PassportUser,
    ) /*: Promise<AddressResDto[]>*/ {
        return this.customersService.getAddress(user.id);
    }

    @Put('address/:addressId')
    @ApiOperation({
        summary: '내 주소지 수정',
        description: '로그인된 고객의 주소지를 수정합니다.',
    })
    @ApiSingleDataResponse(200, AddressResDto)
    async updateAddress(
        @Param('addressId') addressId: string,
        @Body() body: UpdateAddress,
        @User() user: PassportUser,
    ) /*: Promise<AddressResDto>*/ {
        return this.customersService.updateAddress(user.id, addressId, body);
    }

    @Delete('address/:addressId')
    @ApiOperation({
        summary: '내 주소지 삭제',
        description: '로그인된 고객의 주소지를 삭제합니다.',
    })
    async deleteAddress(@Param('addressId') addressId: string) {
        return this.customersService.deleteAddress(addressId);
    }
}
