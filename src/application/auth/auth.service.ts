import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, OauthUser } from './dto/auth.interface';
import { Request, Response } from 'express';
import { CustomersService } from '../../domain/users/customers/services/customers.service';
import { Role } from './dto/role.enum';
import { AdminUsersService } from '../../domain/users/admin-users/admin-users.service';
import { AdminLoginDto } from '../../application/auth/dto/admin-login.dto';
import { CreateAdminDto } from '../../application/auth/dto/create-admin.dto';
import authConfig from '../../infrastructure/config/auth.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private customersService: CustomersService,
        private adminUsersService: AdminUsersService,
        @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
    ) {}

    createLoginToken(payload: JwtPayload) {
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async adminLogin({ email, password }: AdminLoginDto) {
        const adminUser = await this.adminUsersService.login({
            email,
            password,
        });
        const payload: JwtPayload = {
            sub: adminUser.id,
            name: adminUser.name,
            email: adminUser.email,
            roles: [adminUser.role as Role],
        };
        return { accessToken: this.createLoginToken(payload) };
    }

    async adminSignUp(data: CreateAdminDto) {
        return this.adminUsersService.signUp(data);
    }

    async oauthCallback(req: Request, res: Response) {
        try {
            const user = req.user as OauthUser;
            let customer = await this.customersService.findOneCustomerByOauthId(
                user.oauthId,
            );
            if (!customer) {
                customer = await this.customersService.create(user);
            }
            const payload: JwtPayload = {
                sub: customer.id,
                name: customer.name || '',
                email: customer.email,
                roles: [Role.Customer],
            };
            const { accessToken } = this.createLoginToken(payload);
            const redirect =
                req.hostname === 'localhost'
                    ? 'http://localhost:3000'
                    : process.env.REDIRECT_URI;
            res.cookie('session', accessToken, {
                httpOnly: true,
                sameSite: 'lax',
            });
            return res.redirect(
                redirect + `/login/success?code=` + accessToken,
            );
        } catch (error) {
            throw error;
        }
    }

    async customerWithdrawal(customerId: string) {
        return this.customersService.withdrawal(customerId);
    }
}
