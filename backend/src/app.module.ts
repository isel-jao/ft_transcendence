import { Module } from '@nestjs/common';
import { EventsModule } from './getway/events.module';
import {ConfigModule} from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    envFilePath: '.env'}) ,EventsModule],
})
export class AppModule {}
