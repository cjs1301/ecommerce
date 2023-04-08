import { Test, TestingModule } from '@nestjs/testing';
import { MeCartController } from './me-cart.controller';
import { PrismaModule } from '../../../infrastructure/database/prisma.module';
import { CartService } from '../services/cart.service';
import { CartRepository } from '../repository/cart.repository';

describe('MeCartController', () => {
    let controller: MeCartController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PrismaModule],
            controllers: [MeCartController],
            providers: [CartService, CartRepository],
        }).compile();

        controller = module.get<MeCartController>(MeCartController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
