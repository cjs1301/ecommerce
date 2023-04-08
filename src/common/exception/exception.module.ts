import { Logger, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { PrismaClientExceptionFilter } from './prisma-exception.filter';

@Module({
    providers: [
        Logger,
        { provide: APP_FILTER, useClass: HttpExceptionFilter },
        { provide: APP_FILTER, useClass: PrismaClientExceptionFilter },
    ],
})
export class ExceptionModule {}
