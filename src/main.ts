import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import rawBodyMiddleware from './common/middlewares/rawBody.middleware';
import { StatsSevice } from './stats/stats.service';
import { QuestSevice } from './quests/quest.service'
import { PrismaModule } from './prisma/prisma.module';

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
      }
    }),
  );

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
  // app.get(QuestSevice).updateQuests()
  // app.get(StatsSevice).calculateStats();
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
