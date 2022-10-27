import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ConversationController],
  providers: [ConversationService, PrismaService],
})
export class ConversationModule {}
