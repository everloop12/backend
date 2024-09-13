"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const rawBody_middleware_1 = require("./common/middlewares/rawBody.middleware");

async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT || 3000;  // Use PORT provided by Render or fallback to 3000

    // Global prefix for routes
    app.setGlobalPrefix('/v1');

    // Enable Cross-Origin Resource Sharing (CORS)
    app.enableCors();

    // Middleware to handle raw body parsing
    app.use((0, rawBody_middleware_1.default)());

    // Global validation pipes
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        stopAtFirstError: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        }
    }));

    // Swagger configuration
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Lohanza API Documentation')
        .setDescription('Official API documentation for the Lohanza platform, built by Team Lohanza ❤️')
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

    try {
        await app.listen(port);  // Listen on the port
        console.log(`Application is running on: ${await app.getUrl()}`);
    } catch (error) {
        console.error(`Error starting the server: ${error.message}`);
        process.exit(1);  // Exit the process if an error occurs during startup
    }
}

bootstrap();
