import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateConversationDto, UpdateConversationDto } from './entities';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) { }

  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any) {
    const totalResult = await this.prisma.conversation.count({
      where: options.where,
    });
    const results = await this.prisma.conversation.findMany(options);
    return { totalResult, results };
  }

  @HandleRequestErrors()
  async findOne(id: number, query?: any) {
    return await this.prisma.conversation.findUnique({ where: { id }, ...query });
  }

  @HandleRequestErrors()
  async create(data: CreateConversationDto) {
    return await this.prisma.conversation.create({ data });
  }

  @HandleRequestErrors()
  async update(id: number, data: UpdateConversationDto) {
    return await this.prisma.conversation.update({ where: { id }, data });
  }

  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.conversation.delete({ where: { id } });
  }
}
