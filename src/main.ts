import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(json({ limit: '68mb' }));

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
