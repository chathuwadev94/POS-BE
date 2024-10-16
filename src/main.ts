import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import configuration from './app/config/system/configuration';
import { ValidationFilter } from './app/core/filters/validation.filter';
import { AllExceptionsFilter } from './app/core/filters/exception.filter';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(`${configuration().app.version}`);
  app.useGlobalFilters(new ValidationFilter(), new AllExceptionsFilter());
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('Location Device Management API')
    .setDescription('API details of Location Device Management project')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${configuration().app.version}/docs`, app, document, {
    explorer: true,
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
  });
  await app.listen(configuration().app.port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${configuration().app.port
    }/${configuration().app.version}`
  );
}
bootstrap();
