import { Body, Controller, Get, Logger, Post, Request } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller()
export class AppController {

  constructor(
    private readonly authService: AuthService,
    ) {}

  @Post('login')
  async login(@Body() loginUser: LoginUserDto) {
    return this.authService.login(loginUser); // 토큰 리턴
  }

  @ApiBearerAuth()
  @Get('verify')
  verify(@Request() req){
    Logger.debug(`verify [token]>>> ${req.headers.authorization}`);

    let token = req.headers.authorization;
    token = token.replace('Bearer','').trim();

    return this.authService.verifed(token);
  }

}