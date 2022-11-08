import { Module } from "@nestjs/common";
import { ConversationsController } from "./conversations.controller";
import { ConversationsService } from "./conversations.service";
import { Services } from "src/utils/constants";
import { PrismaService } from "src/prisma.service";


@Module({
    controllers:[ConversationsController],
    providers:[ConversationsService, PrismaService]
})
export class ConversationsModule{}