import { Module } from '@nestjs/common';
import { ProductsController } from './interface/products.controller';
import { ProductsService } from './servicesLegacy/products.service';
import { ProductsRepositoryLegacy } from './infra/db/repositoryLegacy/products.repository.legacy';
import { PrismaModule } from '@infrastructure/database/prisma.module';
import { FileModule } from '../file/file.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductsRepository } from './infra/db/repository/products.repository';

// const commandHandlers = [];

// const queryHandlers = [];
//
// const eventHandlers = [];
//
// const factories = [];

const repositories = [
    { provide: 'ProductsRepositoryLegacy', useClass: ProductsRepositoryLegacy },
    { provide: 'ProductsService', useClass: ProductsService },
    { provide: 'ProductsRepository', useClass: ProductsRepository },
];

@Module({
    imports: [PrismaModule, FileModule, InfrastructureModule, CqrsModule],
    controllers: [ProductsController],
    providers: [
        // ...commandHandlers,
        // ...queryHandlers,
        // ...eventHandlers,
        // ...factories,
        ...repositories,
    ],
})
export class ProductsModule {}
