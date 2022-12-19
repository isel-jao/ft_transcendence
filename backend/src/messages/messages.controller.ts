import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Routes } from "src/utils/constants";
import { MessagesService } from "./messages.service";
import { SaveMessageDto } from "./dto/messages-dto.dto";
import { Public } from "src/auth/decorators/public.decorator";



@Controller(Routes.MESSAGES)
@Public()
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) { }

    /*get all the messages*/
    @Get()
    async getAllMessages() {
        return await this.messagesService.getAllMessages();
    }

    @Get(':id_conversation')
    async getMessages(@Param('id_conversation') id: string) {
        return await this.messagesService.getMessages(Number(id));
    }

    @Post()
    async postMessages(@Body() messagePayload: SaveMessageDto) {
        return await this.messagesService.postMessages(messagePayload);
    }

}