import { Body, Controller, Inject, Post } from "@nestjs/common";
import { Routes } from "../utils/constants"
import { Services } from "../utils/constants";
import { IConversationsService } from "./conversations";
import { CreateConversationDto } from "./dto/createConversation.dto";


@Controller(Routes.CONVERSATIONS) //conversations
export class ConversationsController{
    constructor(
        @Inject(Services.CONVERSATIONS)
        private readonly   : IConversationsService
    ){}

    @Post()
    createConversation(@Body() createConversationPayload: CreateConversationDto){
        console.log(createConversationPayload);
    }
}