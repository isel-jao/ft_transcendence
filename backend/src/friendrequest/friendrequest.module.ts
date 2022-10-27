import { Module } from '@nestjs/common';
import { FriendRequestService } from './friendrequest.service';
import { FriendRequestController } from './friendrequest.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [FriendRequestController],
  providers: [FriendRequestService, PrismaService],
})
export class FriendRequestModule {}
