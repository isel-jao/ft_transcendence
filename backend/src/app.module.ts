import { Module } from '@nestjs/common';
import { EventsModule } from './getway/events.module';
import { ConfigModule } from '@nestjs/config'
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesModule } from './messages/messages.module';
import { DmsModule } from './dms/dms.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    envFilePath: '.env'
  }), EventsModule, ConversationsModule, MessagesModule, DmsModule],
})
export class AppModule { }
