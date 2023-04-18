import { Inject, Injectable } from '@nestjs/common';
import { Profile, Strategy } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';
import { OauthUser } from '../dto/auth.interface';
import authConfig from '../../../infrastructure/config/auth.config';
import { ConfigType } from '@nestjs/config';
@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
    constructor(
        @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
    ) {
        super({
            clientID: config.KAKAO_KEY,
            callbackURL: config.REDIRECT_URI + '/auth/kakao/callback',
        });
    }
    async validate(
        access_token: string,
        refresh_token: string,
        profile: Profile,
    ): Promise<OauthUser> {
        const id = profile.id;
        const email = profile._json.kakao_account.email;
        const name = profile._json.kakao_account.name;
        return {
            oauthId: 'kakao' + '_' + id,
            name,
            email,
        };
    }
}
