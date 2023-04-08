import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';
import { ConfigService } from '@nestjs/config';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { PrismaService } from '@infrastructure/database/prisma.service';
import {
    DocumentBuilder,
    OpenAPIObject,
    SwaggerCustomOptions,
    SwaggerDocumentOptions,
    SwaggerModule,
} from '@nestjs/swagger';

export class ServerApplication {
    public async run(): Promise<void> {
        const app = await NestFactory.create(RootModule, {
            snapshot: true,
        });
        const prismaService = app.get(PrismaService);
        const configService = app.get(ConfigService);
        const host = configService.get('HOST') || '0.0.0.0';
        const port = configService.get('PORT') || 4000;

        app.useGlobalPipes(
            new ValidationPipe({
                /**
                 * whitelist: DTO에 없은 속성은 무조건 거른다.
                 * forbidNonWhitelisted: 전달하는 요청 값 중에 정의 되지 않은 값이 있으면 Error를 발생합니다.
                 * transform: 네트워크를 통해 들어오는 데이터는 일반 JavaScript 객체입니다.
                 *            객체를 자동으로 DTO로 변환을 원하면 transform 값을 true로 설정한다.
                 * disableErrorMessages: Error가 발생 했을 때 Error Message를 표시 여부 설정(true: 표시하지 않음, false: 표시함)
                 *                       배포 환경에서는 true로 설정하는 걸 추천합니다.
                 */
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true,
                disableErrorMessages: process.env.NODE_ENV === 'prod',
            }),
        );

        app.use(cookieParser());

        this.buildAPIDocumentation(app);

        await prismaService.enableShutdownHooks(app);
        app.enableCors({
            origin: '*',
            credentials: true,
        });

        this.log(host, port);

        await app.listen(4000);
    }

    private log(host: string, port: number): void {
        Logger.log(
            `Server started on host: ${host}; port: ${port};`,
            ServerApplication.name,
        );
    }
    private buildAPIDocumentation(app: INestApplication): void {
        const title = 'ecommerce server api ';
        const description = 'ecommerce server api ';
        const version = '1.0.0';
        //웹 페이지를 새로고침을 해도 Token 값 유지
        const customOptions: SwaggerCustomOptions = {
            swaggerOptions: {
                persistAuthorization: true,
                defaultModelsExpandDepth: -1,
            },
        };

        const options: SwaggerDocumentOptions = {
            operationIdFactory: (controllerKey: string, methodKey: string) =>
                methodKey,
            deepScanRoutes: true,
        };

        const config: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
            .setTitle(title)
            .setDescription(description)
            .setVersion(version)
            //JWT 토큰 설정
            .addBearerAuth(
                {
                    type: 'http',
                    scheme: 'Bearer',
                    name: 'authorization',
                    in: 'header',
                },
                'accessToken',
            )
            .build();

        const document: OpenAPIObject = SwaggerModule.createDocument(
            app,
            config,
            options,
        );

        SwaggerModule.setup('docs', app, document, customOptions);
    }
    public static new(): ServerApplication {
        return new ServerApplication();
    }
}
