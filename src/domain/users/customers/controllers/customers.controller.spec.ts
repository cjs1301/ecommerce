import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { PrismaModule } from '../../../../infrastructure/database/prisma.module';
import { CustomersService } from '../services/customers.service';
import { CustomersRepository } from '../repository/customers.repository';

describe('CustomersController', () => {
    let controller: CustomersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PrismaModule],
            controllers: [CustomersController],
            providers: [CustomersService, CustomersRepository],
        }).compile();

        controller = module.get<CustomersController>(CustomersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
