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
  UseInterceptors,
  UploadedFile,
  Req,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { User, CreateUserDto, UpdateUserDto } from "./entities";
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { FindAllQuery, FindOneQuery, storage } from "src/utils";
import { Public } from "src/auth/decorators/public.decorator";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("user")
@Public()
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOkResponse({ type: [User] })
  @Get()
  findAll(@Query() query: FindAllQuery, @Req() req: any) {
    return this.userService.findAll(query, req.user);
  }

  @ApiOkResponse({ type: User })
  @Get(":id")
  findOne(@Query() query: FindOneQuery, @Param("id", ParseIntPipe) id: number) {
    return this.userService.findOne(+id, query);
  }

  @ApiCreatedResponse({ type: User })
  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @ApiOkResponse({ type: User })
  @Patch(":id")
  @UseInterceptors(FileInterceptor('imageUrl', {
    storage,
  }),)
  update(@Param("id", ParseIntPipe) id: number,
    @UploadedFile() imageUrl: Express.Multer.File,
    @Body() data: UpdateUserDto
  ) {
    console.log("data", JSON.stringify(data, null, 2));
    console.log("imageUrl", imageUrl);
    return this.userService.update(id, {
      ...data,
      imageUrl: imageUrl?.filename ? process.env.HOST + imageUrl.filename : data.imageUrl,
    });

  }

  @ApiOkResponse({ type: User })
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
