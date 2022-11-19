import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './allExceptionFilter';


async function bootstrap() {
  const { PORT } = process.env;
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);

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
