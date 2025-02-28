import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { AppConfiguration, AppEnvironment } from './config/configuration.interface';
import SwaggerConfig from './config/swagger/swagger.config';

import { createWinstonLogger } from './config/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    logger: createWinstonLogger(),
  });
  /*
   * Configuration Service (environment variables)
   * https://docs.nestjs.com/techniques/configuration#using-in-the-maints
   */
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfiguration>('app');

  const logger = new Logger(`${appConfig.name} - Main`);
  /*
   * Cors Configuration
   * https://docs.nestjs.com/security/cors
   */
  app.enableCors({
    origin: true,
    allowedHeaders: appConfig.corsHeaders,
    methods: appConfig.corsMethods,
  });
  /*
   * Helmet configuration
   * https://docs.nestjs.com/security/helmet
   */
  app.use(
    helmet({
      contentSecurityPolicy: appConfig.env === AppEnvironment.Development ? false : undefined,
    }),
  );
  /*
   * Validation configuration
   * https://docs.nestjs.com/techniques/validation
   */
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: appConfig.isProduction,
    }),
  );

  /*
   * Routes versioning
   * https://docs.nestjs.com/techniques/versioning
   */
  app.enableVersioning();

  /*
   * Swagger Configuration
   * https://docs.nestjs.com/openapi/introduction
   */
  const swaggerDocument = SwaggerModule.createDocument(app, SwaggerConfig.getSwaggerConfig(appConfig));
  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(appConfig.port);
  logger.log(`${appConfig.name} started on ${appConfig.hostName}:${appConfig.port}`);
}

bootstrap();
