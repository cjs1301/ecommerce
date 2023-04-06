import { get } from 'env-var';

export class ApiServerConfig {
    public static readonly HOST: string = get('API_HOST')
        .default('localhost')
        .required()
        .asString();

    public static readonly PORT: number = get('API_PORT')
        .default(4000)
        .required()
        .asPortNumber();

    public static readonly ACCESS_TOKEN_HEADER: string = get(
        'API_ACCESS_TOKEN_HEADER',
    )
        .default('x-api-token')
        .required()
        .asString();
}
