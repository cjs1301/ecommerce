import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { AuthModule } from '../application/auth/auth.module';

@Module({
    imports: [InfrastructureModule, AuthModule],
})
export class RootModule {}
