import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '../../../core/common/decorators/user.decorator';
import { CartService } from '../services/cart.service';
import { PassportUser } from '@application/auth/dto/auth.interface';
import { AddCartItem } from '../dto/req/add-cartItem.dto';
import { CheckoutReqDto } from '../dto/req/checkout.req.dto';
import { CheckoutResDto } from '../dto/res/checkout.res.dto';
import { CartItemResDto } from '../dto/res/cart-item.res.dto';
import {
    ApiMultipleDataResponse,
    ApiSingleDataResponse,
} from '../../../core/common/decorators/success-res.decorator';
import { DeleteCartItemQueryDto } from '../dto/req/delete-cart-item.query.dto';
import { CartItemsResDto } from '../dto/res/cart-items.res.dto';
@ApiTags('서비스', '장바구니')
@Controller('me/cart')
@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard('jwt'))
export class MeCartController {
    constructor(private readonly cartService: CartService) {}

    @ApiOperation({
        summary: '내 장바구니 조회',
        description: '장바구니를 조회합니다.',
    })
    @ApiMultipleDataResponse(200, CartItemsResDto)
    @Get()
    async getCartForMe(
        @User() customer: PassportUser,
    ): Promise<CartItemsResDto[]> {
        return this.cartService.getCart(customer.id);
    }

    @ApiOperation({
        summary: '내 장바구니 추가',
        description: '장바구니에 아이템을 추가 합니다.',
    })
    @Post('items')
    @ApiSingleDataResponse(200, CartItemResDto)
    async addCartItemForMe(
        @User() customer: PassportUser,
        @Body() body: AddCartItem,
    ): Promise<CartItemResDto> {
        return this.cartService.addCartItem(customer.id, body);
    }

    @ApiOperation({
        summary: '내 장바구니 물건 삭제',
        description: '내 장바구니의 품목을 삭제합니다.',
    })
    @Delete('items')
    async deleteCartItemForMe(
        @User() customer: PassportUser,
        @Query() queryDto: DeleteCartItemQueryDto,
    ) {
        console.log(queryDto.itemId);
        if (!queryDto.itemId) {
            return this.cartService.cartEmpty(customer.id);
        }
        return this.cartService.deleteCartItem(customer.id, queryDto.itemId);
    }

    @ApiOperation({
        summary: '내 장바구니 물건 주문',
        description: '내 장바구니의 품목을 주문합니다.',
    })
    @ApiSingleDataResponse(200, CheckoutResDto)
    @Post('checkout')
    async cartCheckoutForMe(
        @User() customer: PassportUser,
        @Body() body: CheckoutReqDto,
    ): Promise<CheckoutResDto> {
        return this.cartService.checkout(customer.id, body);
    }
}
