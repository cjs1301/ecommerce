import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    KAKAO_KEY: process.env.KAKAO_KEY,

    NAVER_CLIENT_ID: process.env.NAVER_CLIENT_ID,
    NAVER_CLIENT_SECRET: process.env.NAVER_CLIENT_SECRET,

    GOOGLE_CLIENT_ID: process.env.NAVER_CLIENT_SECRET,
    GOOGLE_CLIENT_SECRET: process.env.NAVER_CLIENT_SECRET,

    JWT_SECRET: process.env.JWT_SECRET,

    REDIRECT_URI: process.env.REDIRECT_URI,
}));
