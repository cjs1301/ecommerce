import {
    INestApplication,
    Injectable,
    Logger,
    OnModuleInit,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { SoftDeleteMiddleware } from './middleware/soft-delete.middleware';

@Injectable()
export class PrismaService
    extends PrismaClient<Prisma.PrismaClientOptions, 'query'>
    implements OnModuleInit
{
    private readonly logger = new Logger(PrismaService.name);

    constructor() {
        super({ log: [{ emit: 'event', level: 'query' }] });
        this.$use(SoftDeleteMiddleware());
        this.logger.log(`Prisma v${Prisma.prismaVersion.client}`);
        this.$on('query', (e) => this.logger.debug(`${e.query} ${e.params}`));
    }
    async onModuleInit() {
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
}
