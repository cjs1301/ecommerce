import * as Joi from 'joi';

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('dev', 'test', 'prod')
        .default('dev')
        .required(),

    DB_URL: Joi.string()
        .default(
            'postgresql://postgres:1234@localhost:5432/postgres?schema=ecommerce',
        )
        .required(),

    HOST: Joi.string().default('0.0.0.0').required(),
    LOG_ENABLE: Joi.boolean().default('true').required(),
    PORT: Joi.number().default(4000).required(),

    KAKAO_KEY: Joi.string(),

    NAVER_CLIENT_ID: Joi.string(),
    NAVER_CLIENT_SECRET: Joi.string(),

    GOOGLE_CLIENT_ID: Joi.string(),
    GOOGLE_CLIENT_SECRET: Joi.string(),

    REDIRECT_URI: Joi.string().default('localhost:3000'),

    IAMPORT_API_KEY: Joi.string(),
    IAMPORT_API_SECRET: Joi.string(),
});
