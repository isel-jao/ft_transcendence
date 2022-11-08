import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser'
async function bootstrap() {
  const app = await NestFactory.create(AppModule,);

  // prisma
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // validation pipeline
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //   }),

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
