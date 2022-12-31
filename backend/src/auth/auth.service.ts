import { ForbiddenException, Injectable, Redirect } from "@nestjs/common";
import { AuthenticationProvider } from "./utils/auth";
import { UserDetails } from "./utils/types";
import { PrismaService } from "src/prisma.service";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { Token } from "./utils/token.types";
import { Profile } from "passport-42";
import * as argon from "argon2";
import { CreateUserDto } from "../user/entities";

@Injectable()
export class AuthService implements AuthenticationProvider {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(data: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });
    if (user) {
      return user;
    }
    return await this.createUser(data);
  }

  async createUser(data: CreateUserDto) {
    // console.log("creating user", details);
    return await this.prisma.user.create({
      data: {
        ...data,
        profile: {
          create: {},
        },
      },
    });
  }

  async findUser(id: number): Promise<User | undefined> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async login(user): Promise<Token> {
    const payload = { name: user.userName, sub: user.id };
    const at = await this.jwtService.signAsync(payload, {
      expiresIn: "1h",
      secret: process.env.JWT_SECRET,
    });
    return {
      accessToken: at,
    };
  }

  async logout(userId: number) {}

  test() {
    console.log();

    return { msg: "hello" };
  }
  async hashData(data: string) {
    return await argon.hash(data);
  }
}
