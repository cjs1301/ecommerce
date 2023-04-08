import { Test, TestingModule } from '@nestjs/testing';
import { CustomersRepository } from '../repository/customers.repository';
import { CustomersService } from './customers.service';
import { PrismaService } from '../../../../infrastructure/database/prisma.service';

describe('CustomersService', () => {
    let service: CustomersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PrismaService],
            providers: [CustomersService, CustomersRepository],
        }).compile();

        service = module.get<CustomersService>(CustomersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
