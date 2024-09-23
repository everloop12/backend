import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import rawBodyMiddleware from './common/middlewares/rawBody.middleware';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/v1');
  app.enableCors();

  app.use(rawBodyMiddleware());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Serve loaderio verification file
  app.getHttpAdapter().get('/loaderio-4f6c5f433d231fdb509719e6c3ae048c.txt', (req, res) => {
    const filePath = path.join(__dirname, '..', 'loaderio-4f6c5f433d231fdb509719e6c3ae048c.txt');
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send('File not found');
    }
  });

  const config = new DocumentBuilder()
    .setTitle('Lohanza API Doc')
    .setDescription(
      'The official API documentation for the Lohanza API. This API is used to manage the Lohanza platform. Built with love by Team Lohanza ❤',
    )
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

  await app.listen(process.env.PORT || 3500);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
