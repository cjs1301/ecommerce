import { registerAs } from '@nestjs/config';

export default registerAs('server', () => ({
    HOST: process.env.HOST,

    PORT: process.env.PORT,

    LOG_ENABLE: process.env.LOG_ENABLE,
}));
