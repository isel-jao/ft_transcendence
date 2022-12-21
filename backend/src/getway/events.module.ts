import { Module } from "@nestjs/common";
import { ConversationsModule } from "src/conversations/conversations.module";
import { MessagesModule } from "src/messages/messages.module";
import { EventsGeteway } from './events.getway'
import { DmsModule } from "src/dms/dms.module";

@Module({
    imports: [MessagesModule, ConversationsModule, DmsModule],
    providers: [EventsGeteway]
})

export class EventsModule { }



