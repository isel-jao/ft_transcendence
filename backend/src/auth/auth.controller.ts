import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Res,
  Req,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Passport42AuthGuard } from "./guards/passport.guard";
import { Response } from "express";
import { Profile, use } from "passport";
import { Public } from "./decorators/public.decorator";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller("auth")
export class AuthController {
  constructor(private authservice: AuthService) { }

  @Public()
  @Get("login")
  @UseGuards(Passport42AuthGuard)
  @HttpCode(HttpStatus.OK)
  login(@Req() req): any {

    return;
  }

  @Public()
  @Get("redirect")
  @UseGuards(Passport42AuthGuard)
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async redirect(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    const {
      user,
    }: {
      user: Profile;
    } = req;

    if (!user) {
      res.redirect("http://localhost:8081/");
      return;
    }

    req.user = undefined;
    console.log(req.user);

    const tokens = await this.authservice.login(user);

    res.cookie("access_token", tokens.accessToken, {
    });

    res.redirect("http://localhost:8081/");

  }

  @Get("status")
  status(@Req() req: any, @Res() res: any) {
    res.send(req.user);
    return { msg: "ahaha" };
  }

  @Get("logout")
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: any, @Res() res: any) {
    const token = "access_token";
    res.clearCookie(token);
    res.redirect("http://localhost:8081/");
  }

}
