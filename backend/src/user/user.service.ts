import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { FindAllOptions, HandleRequestErrors } from "src/utils";
import { CreateUserDto, UpdateUserDto } from "./entities";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any, user?: any) {
    const totalResult = await this.prisma.user.count({
      where: options.where,
    });
    const results = await this.prisma.user.findMany({
      select: {
        id: true,
        userName: true,
        imageUrl: true,
        status: true,
        friendRequestFrom: true,
        friendRequestTo: true,
        friends: true,
        friendsBy: true,
        profile: {
          select: {
            _count: true,
            badges: true,
          },
        },
      },
      where: {
        ...options.where,
        id: {
          not: user?.id,
        },
      },
    });
    const mappedResults = results.map((u) => {
      const {
        friendRequestFrom,
        friendRequestTo,
        friends,
        friendsBy,
        ...rest
      } = u;
      let reqStatus = "nothing";
      if (
        friends.some((f) => f.id == user.id) ||
        friendsBy.some((f) => f.id == user.id)
      )
        reqStatus = "friend";
      else if (friendRequestFrom.some((f) => f.toId == user.id))
        reqStatus = "sent";
      else if (friendRequestTo.some((f) => f.fromId == user.id))
        reqStatus = "pending";

      return { ...rest, friends, friendsBy, reqStatus };
    });
    return { totalResult, results: mappedResults };
  }

  @HandleRequestErrors()
  async findOne(id: number, query?: any) {
    return await this.prisma.user.findUnique({ where: { id }, ...query });
  }

  @HandleRequestErrors()
  async create(data: CreateUserDto) {
    return await this.prisma.user.create({ data });
  }

  @HandleRequestErrors()
  async update(id: number, data: UpdateUserDto) {
    return await this.prisma.user.update({ where: { id }, data });
  }
  @HandleRequestErrors()
  async sendRequest(data: { id: number }, id: number) {
    return await this.prisma.friendRequest.create({
      data: {
        fromId: id,
        toId: data.id,
      },
    });
  }
  @HandleRequestErrors()
  async acceptRequest(data: { id: number }, id: number) {
    await this.prisma.friendRequest.delete({
      where: {
        friend_request_from_to: {
          fromId: data.id,
          toId: id,
        },
      },
    });
    return await this.prisma.user.update({
      where: { id },
      data: {
        friendsBy: {
          connect: {
            id: data.id,
          },
        },
      },
    });
  }
  @HandleRequestErrors()
  async rejectRequest(data: { id: number }, id: number) {
    return await this.prisma.friendRequest.delete({
      where: {
        friend_request_from_to: {
          fromId: data.id,
          toId: id,
        },
      },
    });
  }

  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
