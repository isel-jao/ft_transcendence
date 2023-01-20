import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser'
import { AllExceptionFilter } from './AllExceptionFilter';
import { PrismaService } from './prisma.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule,);

  const httpAdapter = app.get(HttpAdapterHost);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);




  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
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
