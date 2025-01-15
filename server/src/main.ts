import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ORIGIN, PORT } from './constants/env.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.getHttpAdapter().getInstance().disable('x-powered-by'); //removing from headers

  app.use(cookieParser()); //for working with cookies
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); //strips out props that do not exist in DTO

  app.enableCors({
    origin: configService.get(ORIGIN),
    credentials: true, //allows the browser to include cookies in requests
    exposedHeaders: 'set-cookie', //allows the browser to read set-cookie header
  });

  app.setGlobalPrefix('/api');

  await app.listen(configService.get(PORT) | 3001);
}
bootstrap();
