import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.use(
    '/api/v1/stripe/webhook',
    bodyParser.raw({ type: 'application/json' }),
  );
  await app.listen(process.env.PORT ?? 3000);
  console.log('server running on port 3000');
}
bootstrap();
