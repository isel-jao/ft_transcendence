import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { Routes } from "src/utils/constants";
import { DmsServices } from "./dms.service";
import { Public } from "src/auth/decorators/public.decorator";
import { CreateDmDto } from "src/conversations/dto/dto";



@Public()
@Controller(Routes.DMS) // /dms
export class DmsController {
    constructor(private readonly dmServices: DmsServices) { };

    @Get('/all/:id')
    async getAllDmsOfUser(@Param('id') userId: string) {
        return await this.dmServices.getAllDmsOfUser(Number(userId));
    }


    @Post()
    async createDm(@Body() dm: CreateDmDto) {
        return await this.dmServices.createDm(dm);
    }


    // @Get("/messages/:id") // /dms/messages/1 where 1 is the conversation_id
    // async getAllMessages(@Param('id') userId: string) {
    //     return await this.dmServices.getAllMessages(Number(userId));
    // }



}