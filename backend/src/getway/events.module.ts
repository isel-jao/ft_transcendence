import { Module } from "@nestjs/common";
import {EventsGeteway} from './events.getway'

@Module({
    providers:[EventsGeteway]
})

export class EventsModule {}



