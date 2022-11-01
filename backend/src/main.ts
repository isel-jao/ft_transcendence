import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const {PORT} = process.env;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  try{
    await app.listen(PORT);
    console.log(`running on ${PORT}`);
    
  } catch(err){
    console.log(err);
  }
}
bootstrap();
  