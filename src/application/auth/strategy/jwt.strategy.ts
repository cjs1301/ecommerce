import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

export type JwtPayload = { sub: number; username: string };

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        const extractJwtFromCookie = (req: Request) => {
            let token = null;

            if (req && req.cookies) {
                token = req.cookies['jwt'];
            }
            return token;
        };

        super({
            jwtFromRequest: extractJwtFromCookie,
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),
        });
    }

    async validate(payload: JwtPayload) {
        return { id: payload.sub, username: payload.username };
    }
}
