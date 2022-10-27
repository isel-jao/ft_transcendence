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
import { ConversationService } from './conversation.service';
import { Conversation, CreateConversationDto, UpdateConversationDto } from './entities';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';

@ApiTags('conversation')
@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) { }

  @ApiOkResponse({ type: [Conversation] })
  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.conversationService.findAll(query);
  }

  @ApiOkResponse({ type: Conversation })
  @Get(':id')
  findOne(@Query() query: FindOneQuery, @Param('id', ParseIntPipe) id: number) {
    return this.conversationService.findOne(+id, query);
  }

  @ApiCreatedResponse({ type: Conversation })
  @Post()
  create(@Body() data: CreateConversationDto) {
    return this.conversationService.create(data);
  }

  @ApiOkResponse({ type: Conversation })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateConversationDto) {
    return this.conversationService.update(id, data);
  }

  @ApiOkResponse({ type: Conversation })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.conversationService.remove(id);
  }
}
