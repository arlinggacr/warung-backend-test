import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({}),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Warung Backend Test Documentation')
    .setVersion('1.0.0')
    .build();

  const configService = app.get(ConfigService);
  const logger = new Logger();

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  await app.register(require('@fastify/cookie'));

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  await app.register(require('@fastify/multipart'));

  app.setGlobalPrefix('/v1/api');
  app.enableCors({
    credentials: true,
    origin: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  await app.listen(configService.get('PORT'), '0.0.0.0', (_, addr) =>
    logger.log(`Server running at ${addr}`),
  );
}
bootstrap();
