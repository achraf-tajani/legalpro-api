process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Sécurité headers
  app.use(helmet());

  // CORS
  app.enableCors({
    origin: configService.get<string>('frontendUrl'),
    credentials: true,
  });

  // Validation globale des DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Préfixe API
  app.setGlobalPrefix('api/v1');

  const port = configService.get<number>('port') || 3000;
  await app.listen(port);
  
  console.log(`🚀 Server running on http://localhost:${port}/api/v1`);
}

bootstrap();