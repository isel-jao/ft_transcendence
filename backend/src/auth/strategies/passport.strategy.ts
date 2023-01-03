import { Strategy, Profile, VerifyCallback } from "passport-42";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

import { AuthService } from "../auth.service";

@Injectable()
export class Passport42Strategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID:
        process.env.UID ||
        "u-s4t2ud-21d9f1fa133324bec95708d76391dfa0840f6a17809c76efc0ddb18e2402bdd0",
      clientSecret:
        process.env.SECRET ||
        "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",
      callbackURL: process.env.REDIRECT_URI || "http://localhost:3000/",
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { username: userName, _json, emails } = profile;
    console.log("profiiiiile", profile);

    const email = emails[0].value as string;
    const imageUrl = _json.image.link as string;
    const rest: any = {};

    return await this.authService.validateUser({
      userName,
      imageUrl,
      email,
      ...rest,
    });
  }
}
