import { Module } from '@nestjs/common';
import { Mygeteway } from './gateway';
import { PrismaService } from 'src/prisma.service';

@Module({
    // imports: [Mygeteway],
    providers: [Mygeteway, PrismaService]
})
export class GatwayModule { }
