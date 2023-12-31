import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UnauthorizedInterceptor } from './common/errors/interceptors/unauthorized.interceptor';
import { NotFoundInterceptor } from './common/errors/interceptors/NotFound.interceptor';
import { ConflictInterceptor } from './common/errors/interceptors/conflictError.interceptor';
import { DatabaseInterceptor } from './common/errors/interceptors/database.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Api nest example')
    .setDescription('The Simple API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove all unspecified parameters
      forbidNonWhitelisted: true, // Throw an error if a parameter is not defined in the DTO
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ConflictInterceptor());
  app.useGlobalInterceptors(new DatabaseInterceptor());
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());
  // app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
