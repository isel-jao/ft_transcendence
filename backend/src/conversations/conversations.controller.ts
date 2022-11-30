import { Body, Controller, Get, Post, Param, Delete, Put, } from "@nestjs/common";
import { Routes } from "../utils/constants"
import { ConversationsService } from "./conversations.service";
import { CreateChannelDto } from "./dto/dto";


@Controller(Routes.ROOMS) //conversations
export class ConversationsController {
    constructor(private readonly conversationsService: ConversationsService) { }

    //post request to get the conversation
    @Post()
    async createhannel(@Body() createChannelPayload: CreateChannelDto) {
        console.log({ createChannelPayload });
        return await this.conversationsService.createChannel(createChannelPayload);
    }

    @Get(':user_id')
    async getAllChannels(@Param('user_id') user_id: string) {
        console.log(user_id);
        return this.conversationsService.getAllChannels(Number(user_id));
    }

    @Get(':id')
    async getChannelById(@Param('id') id: string) {
        return await this.conversationsService.getChannelById(Number(id));
    }

    @Delete(':id')
    async deleteChannelById(@Param('id') id: string) {
        return await this.conversationsService.deleteChannelById(Number(id));
    }

    @Put(':id')
    async updateChannel(@Body() channelPayload, @Param('id') id: number) {
        return await this.conversationsService.updateChannel(channelPayload, Number(id));
    }


}