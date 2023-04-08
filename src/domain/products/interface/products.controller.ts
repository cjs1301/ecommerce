import {
    Body,
    Controller,
    Delete,
    Get,
    Inject,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@application/auth/dto/role.enum';
import { Roles } from '@application/auth/decorators/roles.decorator';
import { ProductsService } from '../servicesLegacy/products.service';
import { UpdateProductDto } from './dto/req/update-product.dto';
import { CreateProductDto } from './dto/req/create-product.dto';
import {
    ApiMultipleDataResponse,
    ApiSingleDataResponse,
} from '@common/decorators/success-res.decorator';
import { GetProductResDto } from './dto/res/get-product.res.dto';
import { GetProductsResDto } from './dto/res/get-products.res.dto';

@ApiTags('상품')
@Controller('products')
export class ProductsController {
    constructor(
        @Inject('ProductsService')
        private readonly productsService: ProductsService,
    ) {}

    @ApiTags('어드민')
    @Post()
    @UseGuards(AuthGuard('jwt'))
    @Roles(Role.Master, Role.Manager)
    @ApiBearerAuth('accessToken')
    @ApiOperation({
        summary: '상품 등록',
        description:
            '## - bundles에 등록하는 product는 먼저 생성해야 합니다.\n' +
            '## - thumbnail 항목은 먼저 업로드 api를 통해 해당 사진의 주소값을 res로 받은 후 등록해주세요\n' +
            '(업로드시 사용되는 form-data형식에서 데이터 검증을 사용할수 없어서 따로 뺐습니다)',
    })
    @ApiSingleDataResponse(201, GetProductResDto)
    async createProduct(
        @Body() body: CreateProductDto,
    ): Promise<GetProductResDto> {
        return this.productsService.createProduct(body);
    }

    @Get()
    @ApiTags('어드민', '서비스')
    @ApiOperation({
        summary: '상품 목록',
        description: '상품 리스트를 조회합니다.',
    })
    @ApiMultipleDataResponse(200, GetProductsResDto)
    async productList(): Promise<GetProductsResDto[]> {
        return this.productsService.getAll();
    }

    @ApiTags('어드민', '서비스')
    @Get(':productId')
    @ApiOperation({
        summary: '상품 조회',
        description: '상품 하나를 조회합니다.(쿼리옵션 미업데이트)',
    })
    @ApiSingleDataResponse(200, GetProductResDto)
    async getProduct(
        @Param('productId') productId: string,
    ): Promise<GetProductResDto> {
        return this.productsService.getOne(productId);
    }

    @ApiTags('어드민')
    @Delete(':productId')
    @UseGuards(AuthGuard('jwt'))
    @Roles(Role.Master, Role.Manager)
    @ApiBearerAuth('accessToken')
    @ApiOperation({
        summary: '상품 삭제',
        description: '상품 하나를 삭제합니다.',
    })
    async productDelete(@Param('productId') productId: string) {
        return this.productsService.delete(productId);
    }

    @ApiTags('어드민')
    @Put(':productId')
    @UseGuards(AuthGuard('jwt'))
    @Roles(Role.Master, Role.Manager)
    @ApiBearerAuth('accessToken')
    @ApiOperation({
        summary: '상품 수정',
        description: '상품 하나를 수정합니다.',
    })
    @ApiSingleDataResponse(201, GetProductResDto)
    async productUpdate(
        @Param('productId') productId: string,
        @Body() body: UpdateProductDto,
    ): Promise<GetProductResDto> {
        console.log(body);
        return this.productsService.update(productId, body);
    }
}
