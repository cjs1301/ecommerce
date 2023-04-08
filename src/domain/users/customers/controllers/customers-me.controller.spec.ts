import { Test, TestingModule } from '@nestjs/testing';
import { CustomersMeController } from './customers-me.controller';
import { PrismaModule } from '../../../../infrastructure/database/prisma.module';
import { CustomersService } from '../services/customers.service';
import { CustomersRepository } from '../repository/customers.repository';

describe('CustomersMeController', () => {
    let controller: CustomersMeController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PrismaModule],
            controllers: [CustomersMeController],
            providers: [CustomersService, CustomersRepository],
        }).compile();

        controller = module.get<CustomersMeController>(CustomersMeController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
