import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
    optionsSuccessStatus: 200,
  });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Task Manager API')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(configService.get('port'));
  await console.log('Application port:', configService.get('port'));
}
bootstrap();
