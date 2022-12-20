import { Controller, Get, Param } from "@nestjs/common";
import { Routes } from "src/utils/constants";
import { DmsServices } from "./dms.service";
import { Public } from "src/auth/decorators/public.decorator";



@Public()
@Controller(Routes.DMS)
export class DmsController {
    constructor(private readonly dmServices: DmsServices) { };

    @Get('/all/:id')
    async getAllDmsOfUser(@Param('id') userId: string) {
        return await this.dmServices.getAllDmsOfUser(Number(userId));
    }



}