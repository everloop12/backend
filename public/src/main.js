"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const rawBody_middleware_1 = require("./common/middlewares/rawBody.middleware");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('/v1');
    app.enableCors();
    app.use((0, rawBody_middleware_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        stopAtFirstError: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        }
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Lohanza API Doc')
        .setDescription('The official API documentation for the Lohanza API. This API is used to manage the Lohanza platform. Built with love by Team Lohanza ❤')
        .setVersion('1.0')
        .addBearerAuth()
        .addSecurityRequirements('bearer')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document, {
        customSiteTitle: 'API Docs',
        swaggerOptions: {
            tagsSorter: 'alpha',
            operationsSorter: 'method',
            docExpansion: 'none',
        },
    });
    await app.listen(process.env.PORT || 3500);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map