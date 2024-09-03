/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true, 
    forbidNonWhitelisted: true, 
    transform: true,
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  const options = new DocumentBuilder()
  .setTitle('My API')
  .setDescription('The API description')
  .setVersion('1.0')
  .addTag('users')
  .build();
const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();


