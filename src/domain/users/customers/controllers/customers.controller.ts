import {
    Body,
    Controller,
    Get,
    Param,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CustomersService } from '../services/customers.service';
import { UpdateCustomer } from '../dto/req/update-customer.dto';
import { CustomersResDto } from '../dto/res/customers.res.dto';
import {
    ApiMultipleDataResponse,
    ApiSingleDataResponse,
} from '../../../../common/decorators/success-res.decorator';
import { Roles } from '../../../../application/auth/decorators/roles.decorator';
import { Role } from '../../../../application/auth/dto/role.enum';
import { CustomerResDto } from '../dto/res/customer.res.dto';
import { CustomerIncludeOption } from '../dto/req/query-customer.dto';
import { Customer } from '../customer.entity';
import { JwtAuthGuard } from '../../../../application/auth/guard/jwt.guard';
import { RolesGuard } from '../../../../application/auth/guard/roles.guard';

@Controller()
export class CustomersController {
    constructor(private readonly customersService: CustomersService) {}

    @ApiTags('어드민')
    @ApiMultipleDataResponse(200, CustomersResDto)
    @ApiBearerAuth('accessToken')
    @Roles(Role.Master, Role.Manager)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiUnauthorizedResponse({
        status: 403,
        description: 'AccessToken 권한이 없을 경우',
    })
    @ApiOperation({
        summary: '유저 목록 보기',
    })
    @Get('customers')
    async getCustomers(): Promise<CustomersResDto[]> {
        return this.customersService.getCustomers();
    }

    @ApiTags('어드민')
    @ApiSingleDataResponse(200, CustomerResDto)
    @Roles(Role.Master, Role.Manager)
    @ApiBearerAuth('accessToken')
    @UseGuards(JwtAuthGuard)
    @ApiUnauthorizedResponse({
        status: 401,
        description: 'AccessToken 권한이 없을 경우',
    })
    @ApiBadRequestResponse({
        status: 400,
        description: 'customerId를 찾을수 없을 경우',
    })
    @ApiOperation({
        summary: '유저 상세 정보 보기',
    })
    @Get('customer/:customerId')
    async getCustomer(
        @Param('customerId') customerId: string,
        @Query() include: CustomerIncludeOption,
    ): Promise<CustomerResDto> {
        return this.customersService.getCustomer(customerId, include);
    }

    @ApiTags('어드민')
    @ApiSingleDataResponse(200, Customer)
    @Roles(Role.Master, Role.Manager)
    @ApiBearerAuth('accessToken')
    @UseGuards(JwtAuthGuard)
    @ApiUnauthorizedResponse({
        status: 401,
        description: 'AccessToken 권한이 없을 경우',
    })
    @ApiBadRequestResponse({
        status: 400,
        description: 'customerId를 찾을수 없을 경우',
    })
    @ApiOperation({
        summary: '유저 정보 수정',
    })
    @Put('customer/:customerId')
    async customerUpdate(
        @Param('customerId') customerId: string,
        @Body() body: UpdateCustomer,
    ): Promise<Customer> {
        return this.customersService.updateCustomer(customerId, body);
    }
}
