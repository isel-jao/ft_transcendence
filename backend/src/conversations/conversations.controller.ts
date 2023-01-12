import { Body, Controller, Get, Post, Param, Delete, Put, } from "@nestjs/common";
import { Routes } from "../utils/constants"
import { ConversationsService } from "./conversations.service";
import { createRoomDto, JoinChannelDto } from "./dto/dto";
import { Conversation } from "./Interface";
import { Public } from "src/auth/decorators/public.decorator";


@Controller(Routes.ROOMS) //conversations
@Public()
export class ConversationsController {
    constructor(private readonly conversationsService: ConversationsService) { }


    // moving this route and its handler to above get('id') 
    //to prevent the /all from getting pulled in to be an :id
    @Get('/all/:id')
    async getAllChannels(@Param('id') id: string) {
        return await this.conversationsService.getAllUnjoinedChannels(Number(id));
    }

    @Post('/joinChannel')
    async joinChannel(@Body() payload: JoinChannelDto) {
        return await this.conversationsService.joinChannel(payload);
    }


    // get all memebers of an id_conversation
    @Get('/members/:id')
    async getChannelMembers(@Param('id') idConversation: string) {
        return await this.conversationsService.getChannelMembers(Number(idConversation));
    }

    //post request to get the conversation
    @Post()
    async createRoom(@Body() createRoomPayload: createRoomDto) {
        return await this.conversationsService.createRoom(createRoomPayload);
    }

    @Get(':user_id')
    async getAllChannelsByUser(@Param('user_id') user_id: string) {
        return this.conversationsService.getAllChannelsByUser(Number(user_id));
    }

    @Post(':id')
    async deleteChannelById(@Param('id') id: string) {
        return await this.conversationsService.deleteChannelById(Number(id));
    }

    @Put(':id')
    async updateChannel(@Body() channelPayload, @Param('id') id: number) {
        return await this.conversationsService.updateChannel(channelPayload, Number(id));
    }

}
