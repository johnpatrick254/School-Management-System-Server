import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './lib/allExceptionFilter.filter';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { logger } from './lib/logger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const FRONTED_URL = configService.get('FRONTEND_URL');
  const PORT = configService.get('PORT');
  app.use(helmet());
  app.enableCors({
    origin: ['http://localhost:3000', FRONTED_URL],
    credentials: true,
    allowedHeaders: ['Access-Control-Allow-Origin', 'Content-Type','Accept'],
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(PORT, async () => {
    logger.log(`✅ APP RUNNING ON : ${await app.getUrl()} 🚀`)
  });
}
bootstrap();
