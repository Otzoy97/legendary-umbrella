import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return await this.authService.login(req.user);
  }
}
