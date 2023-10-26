import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove all unspecified parameters
      forbidNonWhitelisted: true, // Throw an error if a parameter is not defined in the DTO
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
