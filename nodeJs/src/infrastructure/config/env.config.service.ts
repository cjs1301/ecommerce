import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '@infrastructure/config/database.config';
import { ApiServerConfig } from '@infrastructure/config/api.server.config';

@Injectable()
export class EnvironmentConfigService
    implements DatabaseConfig, ApiServerConfig
{
    constructor(private configService: ConfigService) {}

    DB_HOST: string = this.configService.get<string>('DB_HOST');

    DB_PORT: string = this.configService.get<number>('DB_PORT');

    DB_USERNAME: string = this.configService.get<string>('DB_USERNAME');

    DB_PASSWORD: string = this.configService.get<string>('DB_PASSWORD');

    DB_NAME: string = this.configService.get<string>('DB_NAME');

    DB_LOG_ENABLE: boolean = this.configService.get<boolean>('DB_LOG_ENABLE');

    HOST: string = this.configService.get<string>('HOST');

    PORT: number = this.configService.get<number>('PORT');

    ACCESS_TOKEN_HEADER: string =
        this.configService.get<string>('DATABASE_NAME');
}
