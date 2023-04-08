import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../infrastructure/database/prisma.module';
import { CustomersMeController } from './controllers/customers-me.controller';
import { CustomersController } from './controllers/customers.controller';
import { CustomersRepository } from './repository/customers.repository';
import { CustomersService } from './services/customers.service';

@Module({
    imports: [PrismaModule],
    controllers: [CustomersController, CustomersMeController],
    providers: [CustomersService, CustomersRepository],
    exports: [CustomersService, CustomersRepository],
})
export class CustomersModule {}
