import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser'
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'body-parser';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
    cors: true,
  });

  app.useStaticAssets('uploads');

  app.use(json({ limit: '1mb' }))


  // prisma
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // validation pipeline
  app.useGlobalPipes(new ValidationPipe());


  const config = new DocumentBuilder()
    .setTitle('npp API')
    .setDescription('NestJs Prisma Postgresql Template')
    .setVersion('1.0')
    .addTag('isel-jao')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/v1/docs', app, document);

  app.enableCors({
    origin: 'http://localhost:8081',
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",

    preflightContinue: false,
  });
  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();
