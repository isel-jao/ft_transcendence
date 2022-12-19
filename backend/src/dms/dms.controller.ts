import { Controller, Get, Param } from "@nestjs/common";
import { Routes } from "src/utils/constants";
import { DmsServices } from "./dms.service";



@Controller(Routes.DMS)
export class DmsController {
    constructor(private readonly dmServices: DmsServices) { };

    @Get('/all/:id')
    async getAllDmsOfUser(@Param('id') userId: string) {
        return await this.dmServices.getAllDmsOfUser(Number(userId));
    }



}