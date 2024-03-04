import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('main');

  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe());
  logger.debug('Localhost is online at 3000');

  await app.listen(3000);
}
bootstrap();
