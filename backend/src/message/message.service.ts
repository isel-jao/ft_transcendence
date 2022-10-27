import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateMessageDto, UpdateMessageDto } from './entities';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) { }

  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any) {
    const totalResult = await this.prisma.message.count({
      where: options.where,
    });
    const results = await this.prisma.message.findMany(options);
    return { totalResult, results };
  }

  @HandleRequestErrors()
  async findOne(id: number, query?: any) {
    return await this.prisma.message.findUnique({ where: { id }, ...query });
  }

  @HandleRequestErrors()
  async create(data: CreateMessageDto) {
    return await this.prisma.message.create({ data });
  }

  @HandleRequestErrors()
  async update(id: number, data: UpdateMessageDto) {
    return await this.prisma.message.update({ where: { id }, data });
  }

  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.message.delete({ where: { id } });
  }
}
