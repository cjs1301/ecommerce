import { Module } from '@nestjs/common';
import { PrismaModule } from '@infrastructure/database/prisma.module';
import { AdminUsersRepository } from './admin-users.repository';
import { AdminUsersService } from './admin-users.service';

@Module({
    imports: [PrismaModule],
    controllers: [],
    providers: [AdminUsersService, AdminUsersRepository],
    exports: [AdminUsersService],
})
export class AdminUsersModule {}
