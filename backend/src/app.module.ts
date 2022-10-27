import { MessageModule } from './message/message.module';
import { ConversationModule } from './conversation/conversation.module';
import { MatchModule } from './match/match.module';
import { ProfileModule } from './profile/profile.module';
import { FriendRequestModule } from './friendrequest/friendrequest.module';
import { UserModule } from './user/user.module';

import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [MessageModule, ConversationModule, MatchModule, ProfileModule, FriendRequestModule, UserModule, ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}