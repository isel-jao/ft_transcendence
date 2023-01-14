import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './allExceptionFilter';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);

  const httpAdapter = app.get(HttpAdapterHost);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // // validation pipeline
  // app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  try {
    await app.listen(PORT);
    console.log(`running on ${PORT}`);
  } catch (err) {
    console.log(err);
  }
}
bootstrap();
