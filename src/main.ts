import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { configSwagger } from './infra/config/swagger.config';
import { InfraModule } from './infra/infra.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(InfraModule);

  configSwagger(app, 'doc');

  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.enableCors({
    credentials: true,
    origin: true,
    exposedHeaders: ['Content-Disposition'],
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
