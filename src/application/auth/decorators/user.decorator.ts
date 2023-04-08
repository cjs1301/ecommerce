import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PassportUser } from '@application/auth/dto/auth.interface';

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): PassportUser => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);
