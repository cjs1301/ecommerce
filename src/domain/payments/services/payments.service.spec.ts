import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { PaymentsRepository } from '../repository/payments.repository';
import { PrismaModule } from '../../../infrastructure/database/prisma.module';
import { PaymentComplete } from '../dto/payment-complete.dto';
import { PrismaService } from '../../../infrastructure/database/prisma.service';

describe('PaymentsService', () => {
    let service: PaymentsService;
    const prisma = new PrismaService();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PrismaModule],
            providers: [PaymentsService, PaymentsRepository],
        }).compile();

        service = module.get<PaymentsService>(PaymentsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('paymentComplete', () => {
        it('생성된 주문데이와 아임포트로 받은 주문데이터의 아이디와 결제액이 같다면 성공', async () => {
            const resultPaymentComplete = await service.paymentComplete(
                getIamportCompleteWebhook(),
            );
            expect(resultPaymentComplete).toEqual({
                status: 'success',
                message: '일반 결제 성공',
            });
        });
    });
});

function getIamportCompleteWebhook(): PaymentComplete {
    return {
        imp_uid: process.env.IAMPORT_UID,
        merchant_uid: 'createOrderId',
        status: 'paid',
    };
}
