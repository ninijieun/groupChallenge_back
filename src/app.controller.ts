import { Body, Controller, Get, Logger, Post, Request } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/user.dto';
import { UsersService } from './modules/users/users.service';

@Controller()
export class AppController {

  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService,
  ) { }

  @Post('login')
  async login(@Body() loginUser: LoginUserDto) {
    return this.authService.login(loginUser); // 토큰 리턴
  }

  /**
   * 회원가입 createUsers()
   * @param CreateUserDto
   * @returns CreateUserDto
   */
  @Post('users') // post는 return 201
  async createUsers(@Body() createUserDto: CreateUserDto) {
    try {
      await this.usersService.create(createUserDto)

      return createUserDto;
    } catch (error) {

      Logger.error(`error >>> ${error}`);
      Logger.error(`error >>> ${JSON.stringify(error)}`);

      throw error;
    }
  }

  @ApiBearerAuth()
  @Get('verify')
  verify(@Request() req) {
    Logger.debug(`verify [token]>>> ${req.headers.authorization}`);

    let token = req.headers.authorization;
    token = token.replace('Bearer', '').trim();

    return this.authService.verifed(token);
  }

}