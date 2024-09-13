import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import rawBodyMiddleware from './common/middlewares/rawBody.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;  // Use PORT provided by Render or fallback to 3000 for local

  // Global prefix for routes
  app.setGlobalPrefix('/v1');

  // Enable Cross-Origin Resource Sharing (CORS)
  app.enableCors();

  // Middleware to handle raw body parsing
  app.use(rawBodyMiddleware());

  // Global validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      }
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Lohanza API Documentation')
    .setDescription('Official API documentation for the Lohanza platform, built by Team Lohanza ❤️')
    .setVersion('1.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
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
