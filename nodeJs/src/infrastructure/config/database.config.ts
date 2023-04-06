import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseConfig {
    constructor(private configService: ConfigService) {}
    public static readonly DB_HOST: string =
        this.configService.get<string>('DB_HOST');

    public static readonly DB_PORT: number =
        this.configService.get<number>('DB_PORT');

    public static readonly DB_USERNAME: string;

    public static readonly DB_PASSWORD: string;

    public static readonly DB_NAME: string;

    public static readonly DB_LOG_ENABLE: boolean;
}
