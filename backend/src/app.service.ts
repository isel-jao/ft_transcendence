import { Injectable } from '@nestjs/common';
import { PrismaService } from "src/prisma.service";

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }

  getUser(id: number) {

    return this.prisma.user.findUnique({
      where: {
        id: id
      }
    });
  }
}
