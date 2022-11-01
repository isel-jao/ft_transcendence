import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FindAllOptions, HandleRequestErrors } from 'src/utils';
import { CreateProfileDto, UpdateProfileDto } from './entities';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) { }

  @FindAllOptions({})
  @HandleRequestErrors()
  async findAll(options?: any) {
    const totalResult = await this.prisma.profile.count({
      where: options.where,
    });
    const results = await this.prisma.profile.findMany(options);
    return { totalResult, results };
  }

  @HandleRequestErrors()
  async findOne(id: number, query?: any) { 
    return await this.prisma.profile.findUnique({ where: { id }, ...query });
  }

  @HandleRequestErrors()
  async create(data: CreateProfileDto) {
    return await this.prisma.profile.create({ data });
  }

  @HandleRequestErrors()
  async update(id: number, data: UpdateProfileDto) {
    return await this.prisma.profile.update({ where: { id }, data });
  }

  @HandleRequestErrors()
  async remove(id: number) {
    return await this.prisma.profile.delete({ where: { id } });
  }
}
