import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getUser(@Req() req: { user: { id: number } }) {

    return this.appService.getUser(req.user.id);
  }
}
