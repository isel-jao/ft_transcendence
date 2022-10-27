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
} from '@nestjs/common';
import { MatchService } from './match.service';
import { Match, CreateMatchDto, UpdateMatchDto } from './entities';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';

@ApiTags('match')
@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) { }

  @ApiOkResponse({ type: [Match] })
  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.matchService.findAll(query);
  }

  @ApiOkResponse({ type: Match })
  @Get(':id')
  findOne(@Query() query: FindOneQuery, @Param('id', ParseIntPipe) id: number) {
    return this.matchService.findOne(+id, query);
  }

  @ApiCreatedResponse({ type: Match })
  @Post()
  create(@Body() data: CreateMatchDto) {
    return this.matchService.create(data);
  }

  @ApiOkResponse({ type: Match })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateMatchDto) {
    return this.matchService.update(id, data);
  }

  @ApiOkResponse({ type: Match })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.matchService.remove(id);
  }
}
