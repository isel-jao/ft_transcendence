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
import { Request, Response } from "express";
import { Profile, use } from "passport";
import { Token } from "./utils/token.types";
import { Public } from "./decorators/public.decorator";
import { User } from "@prisma/client";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { Redirect } from "@nestjs/common";
import { Test } from "@nestjs/testing";

@Controller("auth")
export class AuthController {
  constructor(private authservice: AuthService) {}

  /**
   * Get /api/auth/login
   * This is the route user will visit for authentication
   */
  @Public()
  @Get("login")
  @UseGuards(Passport42AuthGuard)
  @HttpCode(HttpStatus.OK)
  login(@Req() req): any {
    // console.log(req.user);

    return;
  }

  /**
   * Get /api/auth/redirect
   * This is the redirect URL or route the OAuth2 provider will call.
   */
  // @Redirect("http://localhost:3000/login/success")
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
      res.redirect("http://localhost:8080/");
      return;
    }

    req.user = undefined;
    console.log(req.user);

    const tokens = await this.authservice.login(user);

    res.cookie("access_token", tokens.accessToken, {
      httpOnly: true,
    });

    // res.setHeader(
    //   "Set-Cookie",
    //   `access_token=${tokens.accessToken}; SameSite=Strict; Secure; Path=/; Max-Age=${process.env.JWT_EXPIRATION_TIME}`
    // );
    res.redirect("http://192.168.10.69:3000/");

    // res.send(user);
  }

  /**
   * Get /api/auth/status
   * This is the route user will visit for authentication
   */

  @Get("status")
  status(@Req() req: any, @Res() res: any) {
    res.send(req.user);
    return { msg: "ahaha" };
  }

  @Get("logout")
  @HttpCode(HttpStatus.OK)
  logout(@Req() req: any, @Res() res: any) {
    // const user = req.user;

    // return this.authservice.logout(user["id"]);
    const token = "access_token";
    res.clearCookie(token);
    res.send("logout succesufully");
  }

  @Get("test2")
  test() {
    return this.authservice.test();
  }
}
