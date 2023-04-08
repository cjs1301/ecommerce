import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infrastructure/database/prisma.module';
import { PaymentsController } from './controllers/payments.controller';
import { ImpWebhookController } from './controllers/webhook.controller';
import { PaymentsRepository } from './repository/payments.repository';
import { PaymentsService } from './services/payments.service';

@Module({
    imports: [PrismaModule],
    controllers: [PaymentsController, ImpWebhookController],
    providers: [PaymentsService, PaymentsRepository],
    exports: [PaymentsService],
})
export class PaymentsModule {}
