import { Module } from "@nestjs/common";
import { ConversationsController } from "./conversations.controller";
import { ConversationsService } from "./conversations.service";
import { PrismaService } from "src/prisma.service";


@Module({
    controllers: [ConversationsController],
    providers: [ConversationsService, PrismaService],
    exports: [ConversationsService]
})
export class ConversationsModule { }