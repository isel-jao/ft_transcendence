import { Module } from "@nestjs/common";
import { DmsController } from "./dms.controller";
import { DmsServices } from "./dms.service";
import { PrismaService } from "src/prisma.service";


@Module({
    controllers: [DmsController],
    providers: [DmsServices, PrismaService],
    exports: [DmsServices],
})

export class DmsModule { }