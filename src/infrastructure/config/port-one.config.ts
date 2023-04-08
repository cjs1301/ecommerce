import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    IAMPORT_API_KEY: process.env.IAMPORT_API_KEY,

    IAMPORT_API_SECRET: process.env.IAMPORT_API_SECRET,
}));
