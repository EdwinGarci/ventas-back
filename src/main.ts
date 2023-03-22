import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
    transform: true,
    whitelist: true,
    transformOptions: {
      enableImplicitConversion: true,
    }
  }));
  app.enableCors();
  await app.listen(AppModule.port);
  
}
bootstrap();
