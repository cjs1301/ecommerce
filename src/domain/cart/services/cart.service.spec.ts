import { Test, TestingModule } from '@nestjs/testing';
import { CartRepository } from '../repository/cart.repository';
import { CartService } from './cart.service';
import { PrismaService } from '../../../infrastructure/database/prisma.service';

describe('CartService', () => {
    let service: CartService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CartService, CartRepository],
        }).compile();

        service = module.get<CartService>(CartService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
