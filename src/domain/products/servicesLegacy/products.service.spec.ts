import { Test, TestingModule } from '@nestjs/testing';
import { ProductsRepository } from '../infra/db/repositoryLegacy/products.repository.legacy';
import { ProductsService } from './products.service';
import { PrismaService } from '../../../infrastructure/database/prisma.service';

describe('ProductsService', () => {
    let service: ProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PrismaService],
            providers: [ProductsService, ProductsRepository],
        }).compile();

        service = module.get<ProductsService>(ProductsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
