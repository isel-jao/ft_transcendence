import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const {PORT} = process.env;
  const app = await NestFactory.create(AppModule);
  try{
    await app.listen(PORT);
    console.log(`running on ${PORT}`);
  } catch(err){
    console.log(err);
  }
}
bootstrap();
