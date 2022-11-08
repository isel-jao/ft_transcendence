import { Body, Controller, Get, Post, Param } from "@nestjs/common";
import { Routes } from "../utils/constants"
import { Services } from "../utils/constants";
import { ConversationsService } from "./conversations.service";
import { CreateConversationDto } from "./dto/createConversation.dto";


@Controller(Routes.CONVERSATIONS) //conversations
export class ConversationsController {
    constructor(private readonly conversationsService: ConversationsService) { }

    //post request to get the conversation
    @Post()
    async createConversation(@Body() createConversationPayload: any) {
        return this.conversationsService.createConversation(createConversationPayload);
    }

    @Get()
    async getAllConversations() {
        //add userid 
        return this.conversationsService.findAllConversations();
    }

    @Get(':id')
    async getConversation(@Param('id') id: string) {
        return this.conversationsService.findConversation(parseInt(id));
    }
}