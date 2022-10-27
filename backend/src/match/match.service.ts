import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateMatchDto, UpdateMatchDto } from './entities';

@Injectable()
export class MatchService {
  constructor(private prisma: PrismaService) { }

  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any) {
    const totalResult = await this.prisma.match.count({
      where: options.where,
    });
    const results = await this.prisma.match.findMany(options);
    return { totalResult, results };
  }

  @HandleRequestErrors()
  async findOne(id: number, query?: any) {
    return await this.prisma.match.findUnique({ where: { id }, ...query });
  }

  @HandleRequestErrors()
  async create(data: CreateMatchDto) {
    return await this.prisma.match.create({ data });
  }

  @HandleRequestErrors()
  async update(id: number, data: UpdateMatchDto) {
    return await this.prisma.match.update({ where: { id }, data });
  }

  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.match.delete({ where: { id } });
  }
}
