import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { Passport42Strategy } from "./strategies/passport.strategy";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { PrismaService } from "src/prisma.service";
@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [Passport42Strategy, AuthService, JwtStrategy, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
