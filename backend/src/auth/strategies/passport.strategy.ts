import { Strategy, Profile, VerifyCallback } from "passport-42";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

import { AuthService } from "../auth.service";

@Injectable()
export class Passport42Strategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.UID,
      clientSecret: process.env.SECRET,
      callbackURL: process.env.REDIRECT_URI,
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
