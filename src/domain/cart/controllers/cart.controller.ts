import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartService } from '../services/cart.service';

@ApiTags('장바구니')
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}
}
