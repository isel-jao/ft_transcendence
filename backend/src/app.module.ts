import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { EventsModule } from './getway/events.module';
import { ConfigModule } from '@nestjs/config'
import { ConversationsModule } from './conversations/conversations.module';
import { MessagesModule } from './messages/messages.module';
import { DmsModule } from './dms/dms.module';
import { MatchModule } from "./match/match.module";
import { ProfileModule } from "./profile/profile.module";
import { FriendRequestModule } from "./friendrequest/friendrequest.module";
import { UserModule } from "./user/user.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma.service";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { GatwayModule } from "./game/gateway/gateway.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: '.env'
    }),
    MatchModule,
    ProfileModule,
    FriendRequestModule,
    UserModule,
    AuthModule,
    GatwayModule,
    EventsModule, ConversationsModule, MessagesModule, DmsModule
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
