import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { Request } from "express";
import { Injectable, Req } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || "JWT_SECRET",
    });
  }

  private static extractJWT(@Req() req: any): string | null {
    if (
      req.cookies &&
      "access_token" in req.cookies &&
      req.cookies.access_token.length > 0
    ) {
      return req.cookies.access_token;
    }
    return null;
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      username: payload.name,
    };
  }
}
