import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { PrismaModule } from '../../../infrastructure/database/prisma.module';
import { CartService } from '../services/cart.service';
import { CartRepository } from '../repository/cart.repository';

describe('CartController', () => {
    let controller: CartController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PrismaModule],
            controllers: [CartController],
            providers: [CartService, CartRepository],
        }).compile();

        controller = module.get<CartController>(CartController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
