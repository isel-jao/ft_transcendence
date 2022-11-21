import { Body, Controller, Get, Post, Param, Delete, Put, HttpException, HttpStatus, Catch, UseFilters } from "@nestjs/common";
import { Conversation } from "@prisma/client";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime";
import { AllExceptionFilter } from "src/allExceptionFilter";
import { Routes } from "../utils/constants"
import { Services } from "../utils/constants";
import { ConversationsService } from "./conversations.service";
import { CreateChannelDto } from "./dto/dto";


@Controller(Routes.ROOMS) //conversations
export class ConversationsController {
    constructor(private readonly conversationsService: ConversationsService) { }

    //post request to get the conversation
    @Post()
    async createhannel(@Body() createChannelPayload: CreateChannelDto) {
        console.log({ createChannelPayload });
        return this.conversationsService.createChannel(createChannelPayload);
    }

    @Get()
    async getAllChannels(/* add user id */) {
        return this.conversationsService.getAllChnnels();
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
        return this.conversationsService.updateChannel(channelPayload, Number(id));
    }

}