import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { CurrentUser } from './common/decorators/current-user.decorator';
import type { IUser } from './common/interfaces/user.interface';

@Controller()
export class AppController {
  @Get()
  health() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('hello')
  hello(@CurrentUser() user: IUser) {
    return {
      message: `Hello ${user.email}!`,
      user: user,
    };
  }
}