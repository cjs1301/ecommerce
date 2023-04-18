import { Strategy, Profile } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { stringEmptyCheck } from '../../../common/utils';
import { OauthUser } from '../dto/auth.interface';
import authConfig from '../../../infrastructure/config/auth.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
    ) {
        super({
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: config.REDIRECT_URI + '/auth/google/callback',
            scope: ['email', 'profile'],
        });
    }

    async validate(
        access_token: string,
        refresh_token: string,
        profile: Profile,
    ): Promise<OauthUser> {
        const email = stringEmptyCheck(profile._json.email, 'empty');
        const name = stringEmptyCheck(profile._json.name, 'empty');
        return {
            oauthId: 'google' + '_' + profile.id,
            name,
            email,
        };
    }
}
