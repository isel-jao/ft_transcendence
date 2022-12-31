import { UserModule } from './user/user.module';
import { BadgeModule } from './badge/badge.module';
import { MessageModule } from "./message/message.module";
import { ConversationModule } from "./conversation/conversation.module";
import { MatchModule } from "./match/match.module";
import { ProfileModule } from "./profile/profile.module";
import { FriendRequestModule } from "./friendrequest/friendrequest.module";

import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma.service";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";

@Module({
  imports: [UserModule, BadgeModule,
    MessageModule,
    ConversationModule,
    MatchModule,
    ProfileModule,
    FriendRequestModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
