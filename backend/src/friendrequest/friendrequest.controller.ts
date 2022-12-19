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
import { FriendRequestService } from './friendrequest.service';
import { FriendRequest, CreateFriendRequestDto, UpdateFriendRequestDto } from './entities';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';

@ApiTags('friendrequest')
@Controller('friendrequest')
export class FriendRequestController {
  constructor(private readonly friendrequestService: FriendRequestService) { }

  @ApiOkResponse({ type: [FriendRequest] })
  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.friendrequestService.findAll(query);
  }

  @ApiOkResponse({ type: FriendRequest })
  @Get(':id')
  findOne(@Query() query: FindOneQuery, @Param('id', ParseIntPipe) id: number) {
    return this.friendrequestService.findOne(+id, query);
  }

  @ApiCreatedResponse({ type: FriendRequest })
  @Post()
  create(@Body() data: CreateFriendRequestDto) {
    return this.friendrequestService.create(data);
  }

  @ApiOkResponse({ type: FriendRequest })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateFriendRequestDto) {
    return this.friendrequestService.update(id, data);
  }

  @ApiOkResponse({ type: FriendRequest })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.friendrequestService.remove(id);
  }
}
