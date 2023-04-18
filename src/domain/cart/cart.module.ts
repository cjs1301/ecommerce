import { Module } from '@nestjs/common';
import { CartController } from './controllers/cart.controller';
import { CartService } from './services/cart.service';
import { MeCartController } from './controllers/me-cart.controller';
import { CartRepository } from './repository/cart.repository';
import { PrismaModule } from '../../infrastructure/database/prisma.module';
import { PointModule } from '../point/point.module';
import { CustomersModule } from '../users/customers/customers.module';

@Module({
    imports: [PrismaModule, PointModule, CustomersModule],
    controllers: [CartController, MeCartController],
    providers: [CartService, CartRepository],
})
export class CartModule {}
