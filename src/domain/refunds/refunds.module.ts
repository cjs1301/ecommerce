import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infrastructure/database/prisma.module';
import { RefundsController } from './controller/refunds.controller';
import { RefundsMeController } from './controller/refunds-me.controller';
import { RefundsService } from './services/refunds.service';
import { RefundsRepository } from './repository/refunds.repository';
import { PaymentsModule } from '../payments/payments.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
    imports: [PrismaModule, PaymentsModule, OrdersModule],
    controllers: [RefundsController, RefundsMeController],
    providers: [RefundsService, RefundsRepository],
})
export class RefundsModule {}
