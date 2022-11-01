import { Module } from '@nestjs/common';
import { EventsModule } from './getway/events.module';
import {ConfigModule} from '@nestjs/config'
import { ConversationsModule } from './conversations/conversations.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    envFilePath: '.env'}) ,EventsModule, ConversationsModule],
})
export class AppModule {}
