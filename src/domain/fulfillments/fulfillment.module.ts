import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infrastructure/database/prisma.module';
import { FulfillmentController } from './controller/fulfillment.controller';
import { FulfillmentService } from './services/fulfillment.service';
import { FulfillmentRepository } from './repository/fulfillment.repository';
import { OrdersModule } from '../orders/orders.module';

@Module({
    imports: [PrismaModule, OrdersModule],
    controllers: [FulfillmentController],
    providers: [FulfillmentService, FulfillmentRepository],
})
export class FulfillmentModule {}
