import { Module } from '@nestjs/common';
import { EventsModule } from './getway/events.module';

@Module({
  imports: [EventsModule],
})
export class AppModule {}
