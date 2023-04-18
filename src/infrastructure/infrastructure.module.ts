import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './config/vaildation.schema';
import { PrismaModule } from './database/prisma.module';
import apiServerConfig from './config/api.server.config';
import authConfig from './config/auth.config';
import databaseConfig from './config/database.config';
import portOneConfig from './config/port-one.config';
import { LoggingModule } from './logging/logging.module';

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
