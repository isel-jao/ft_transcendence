import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateFriendRequestDto, UpdateFriendRequestDto } from './entities';

@Injectable()
export class FriendRequestService {
  constructor(private prisma: PrismaService) { }

  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any) {
    const totalResult = await this.prisma.friendRequest.count({
      where: options.where,
    });
    const results = await this.prisma.friendRequest.findMany(options);
    return { totalResult, results };
  }

  @HandleRequestErrors()
  async findOne(id: number, query?: any) {
    return await this.prisma.friendRequest.findUnique({ where: { id }, ...query });
  }

  @HandleRequestErrors()
  async create(data: CreateFriendRequestDto) {
    return await this.prisma.friendRequest.create({ data });
  }

  @HandleRequestErrors()
  async update(id: number, data: UpdateFriendRequestDto) {
    return await this.prisma.friendRequest.update({ where: { id }, data });
  }

  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.friendRequest.delete({ where: { id } });
  }
}
