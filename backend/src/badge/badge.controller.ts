import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { BadgeService } from "./badge.service";
import { Badge, CreateBadgeDto, UpdateBadgeDto } from "./entities";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { FindAllQuery, FindOneQuery } from "src/utils";
import { Public } from "src/auth/decorators/public.decorator";

@ApiTags("badge")
@Controller("badge")
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  @ApiOkResponse({ type: [Badge] })
  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.badgeService.findAll(query);
  }

  @ApiOkResponse({ type: Badge })
  @Get(":id")
  findOne(@Query() query: FindOneQuery, @Param("id", ParseIntPipe) id: number) {
    return this.badgeService.findOne(+id, query);
  }

  @ApiCreatedResponse({ type: Badge })
  @Post()
  create(@Body() data: CreateBadgeDto) {
    return this.badgeService.create(data);
  }

  @ApiOkResponse({ type: Badge })
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() data: UpdateBadgeDto) {
    return this.badgeService.update(id, data);
  }

  @ApiOkResponse({ type: Badge })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.badgeService.remove(id);
  }
}
