import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { CustomersModule } from '../../domain/users/customers/customers.module';
import { AuthService } from './auth.service';
import { NaverStrategy } from './strategy/naver.strategy';
import { JwtModule } from '@nestjs/jwt';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { AdminUsersModule } from '../../domain/users/admin-users/admin-users.module';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        CustomersModule,
        AdminUsersModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => {
                return {
                    secret: configService.get<string>('JWT_SECRET'),
                    signOptions: {
                        expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
                    },
                };
            },
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, NaverStrategy, KakaoStrategy, GoogleStrategy],
    exports: [AuthService, JwtModule, PassportModule],
    controllers: [AuthController],
})
export class AuthModule {}
