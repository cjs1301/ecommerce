import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PrismaModule } from '../../../infrastructure/database/prisma.module';
import { PaymentsService } from '../services/payments.service';
import { PaymentsRepository } from '../repository/payments.repository';

describe('PaymentsController', () => {
    let controller: PaymentsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PrismaModule],
            controllers: [PaymentsController],
            providers: [PaymentsService, PaymentsRepository],
        }).compile();

        controller = module.get<PaymentsController>(PaymentsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
