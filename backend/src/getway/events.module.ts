import { Module } from "@nestjs/common";
import { ConversationsModule } from "src/conversations/conversations.module";
import {EventsGeteway} from './events.getway'

@Module({
    providers:[EventsGeteway]
})

export class EventsModule {}



