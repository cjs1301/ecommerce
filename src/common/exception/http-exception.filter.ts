import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    Logger,
    InternalServerErrorException,
    Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigType } from '@nestjs/config';
import apiServerConfig from '@infrastructure/config/api.server.config';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(
        private logger: Logger,
        @Inject(apiServerConfig.KEY)
        private config: ConfigType<typeof apiServerConfig>,
    ) {}
    public catch(exception: Error, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();
        const stack = exception.stack;

        if (!(exception instanceof HttpException)) {
            exception = new InternalServerErrorException();
        }

        const response = (exception as HttpException).getResponse();

        if (this.config.LOG_ENABLE) {
            const log = {
                timestamp: new Date(),
                url: req.url,
                response,
                stack,
            };
            this.logger.log(log);
        }

        res.status((exception as HttpException).getStatus()).json(response);
    }
}
