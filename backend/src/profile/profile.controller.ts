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
import { ProfileService } from './profile.service';
import { Profile, CreateProfileDto, UpdateProfileDto } from './entities';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindAllQuery, FindOneQuery } from 'src/utils';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @ApiOkResponse({ type: [Profile] })
  @Get()
  findAll(@Query() query: FindAllQuery) {
    return this.profileService.findAll(query);
  }

  @ApiOkResponse({ type: Profile })
  @Get(':id')
  findOne(@Query() query: FindOneQuery, @Param('id', ParseIntPipe) id: number) {
    return this.profileService.findOne(+id, query);
  }

  @ApiCreatedResponse({ type: Profile })
  @Post()
  create(@Body() data: CreateProfileDto) {
    return this.profileService.create(data);
  }

  @ApiOkResponse({ type: Profile })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateProfileDto) {
    return this.profileService.update(id, data);
  }

  @ApiOkResponse({ type: Profile })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.remove(id);
  }
}
