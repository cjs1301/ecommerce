import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
    catch(
        exception: Prisma.PrismaClientKnownRequestError,
        host: ArgumentsHost,
    ) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const message = exception.message.replace(/\n/g, '');

        switch (exception.code) {
            case 'P2002': {
                const status = HttpStatus.CONFLICT;
                res.status(status).json(message);
                break;
            }
            case 'P2003': {
                const status = HttpStatus.CONFLICT;
                res.status(status).json(message);
                break;
            }
            case 'P2025': {
                const status = HttpStatus.CONFLICT;
                res.status(status).json(message);
                break;
            }
            default:
                // default 500 error code
                super.catch(exception, host);
                break;
        }
    }
}
