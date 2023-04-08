import { Module } from '@nestjs/common';
import { OrdersMeController } from './controllers/orders-me.controller';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { OrdersRepository } from './repository/orders.repository';
import { PrismaModule } from '../../infrastructure/database/prisma.module';
import { PaymentsModule } from '../payments/payments.module';

@Module({
    imports: [PrismaModule, PaymentsModule],
    controllers: [OrdersController, OrdersMeController],
    providers: [OrdersService, OrdersRepository],
    exports: [OrdersRepository],
})
export class OrdersModule {}
