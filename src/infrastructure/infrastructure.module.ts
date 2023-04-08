import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from '@infrastructure/config/vaildation.schema';
import { PrismaModule } from '@infrastructure/database/prisma.module';
import apiServerConfig from '@infrastructure/config/api.server.config';
import authConfig from '@infrastructure/config/auth.config';
import databaseConfig from '@infrastructure/config/database.config';
import portOneConfig from '@infrastructure/config/port-one.config';
import { LoggingModule } from '@infrastructure/logging/logging.module';

const providers: Provider[] = [];

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [apiServerConfig, authConfig, databaseConfig, portOneConfig],
            validationSchema,
        }),
        PrismaModule,
        LoggingModule,
    ],
    providers: providers,
    exports: [],
})
export class InfrastructureModule {}
