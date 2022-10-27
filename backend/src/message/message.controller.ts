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
import { MessageService } from './message.service';
import { Message, CreateMessageDto, UpdateMessageDto } from './entities';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';

@ApiTags('message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @ApiOkResponse({ type: [Message] })
  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.messageService.findAll(query);
  }

  @ApiOkResponse({ type: Message })
  @Get(':id')
  findOne(@Query() query: FindOneQuery, @Param('id', ParseIntPipe) id: number) {
    return this.messageService.findOne(+id, query);
  }

  @ApiCreatedResponse({ type: Message })
  @Post()
  create(@Body() data: CreateMessageDto) {
    return this.messageService.create(data);
  }

  @ApiOkResponse({ type: Message })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateMessageDto) {
    return this.messageService.update(id, data);
  }

  @ApiOkResponse({ type: Message })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.messageService.remove(id);
  }
}
