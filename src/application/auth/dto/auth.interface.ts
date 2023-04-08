import { Role } from './role.enum';

export interface JwtPayload {
    sub: string; //userId
    name: string;
    email: string;
    roles: Role[];
}

export interface OauthUser {
    oauthId: string;
    email: string;
    name: string;
}

export interface PassportUser {
    id: string;
    email: string;
    name: string;
}
