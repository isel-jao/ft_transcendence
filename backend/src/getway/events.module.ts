import { Module } from "@nestjs/common";
import { ConversationsModule } from "src/conversations/conversations.module";
import { MessagesModule } from "src/messages/messages.module";
import { EventsGeteway } from './events.getway'

@Module({
    imports: [MessagesModule, ConversationsModule],
    providers: [EventsGeteway]
})

export class EventsModule { }



