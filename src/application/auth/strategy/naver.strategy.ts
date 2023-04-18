import { Profile, Strategy } from 'passport-naver';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { stringEmptyCheck } from '../../../common/utils';
import { OauthUser } from '../dto/auth.interface';
import authConfig from '../../../infrastructure/config/auth.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
    ) {
        super({
            clientID: config.NAVER_CLIENT_ID,
            clientSecret: config.NAVER_CLIENT_SECRET,
            callbackURL: config.REDIRECT_URI + '/auth/naver/callback',
        });
    }

    async validate(
        access_token: string,
        refresh_token: string,
        profile: Profile,
    ): Promise<OauthUser> {
        const { email, nickname, id } = profile._json;
        const name = stringEmptyCheck(nickname, 'empty');

        return {
            oauthId: 'naver' + '_' + id,
            name,
            email,
        };
    }
}
