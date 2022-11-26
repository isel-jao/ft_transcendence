import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { MessagesController } from "./messages.controller";
import { MessagesService } from "./messages.service";

@Module({
    controllers: [MessagesController],
    providers: [MessagesService, PrismaService],
    exports: [MessagesService]
})


export class MessagesModule { }