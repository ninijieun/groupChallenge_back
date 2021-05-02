import { Logger } from '@nestjs/common';
import { User } from './../entity/user.entity';
import { jwtConstants } from './auth.constant';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {

  constructor(
      private usersService: UsersService,
      private jwtService: JwtService
    ) {}

  async validateLogin(userId: string, password: string): Promise<User> {
    Logger.debug(`[AuthService] :: [validateLogin] :: find user....`);
    const user = await this.usersService.findOne(userId);
    Logger.debug(`[AuthService] :: [validateLogin] :: find user.... :: ${JSON.stringify(user)}`);
    if (!user) {
        throw new NotFoundException({
          error: 'Not Found',
          message: ['사용자를 찾지 못했습니다.'],
        });
    }

    Logger.debug(`[AuthService] :: [validateLogin] :: check password....`);
    const pass = await user.checkPassword(password);
    Logger.debug(`[AuthService] :: [validateLogin] :: check password.... :: ${pass}`);
    if(!pass){
        throw new BadRequestException({
            error: 'Bad Request',
            message: ['비밀번호가 틀렸습니다.'],
          });
    }

    return user;
  }

  async validateUser(userId: string){
    Logger.debug(`[AuthService] :: [validateUser] :: find user....`);
    const user = await this.usersService.findOne(userId);
    Logger.debug(`[AuthService] :: [validateUser] :: find user.... :: ${JSON.stringify(user)}`);

    return user;
  }

  async login(loginUser: LoginUserDto) {
    const user = await this.validateLogin(loginUser.userId, loginUser.password);
    if(!user){
      throw new UnauthorizedException();
    }
    const payload = { 
      sub : user.userId, // userId를 담는 sub 라는 프로퍼티의 이름은 JWT 규격에 부합하기 위함이다.
      userId: user.userId, 
      userName: user.userName,
      // 추가사항 추가
    };

    const secret = Buffer.from(jwtConstants.secret, 'base64').toString('ascii');
    return {
      access_token: this.jwtService.sign(payload, {algorithm: 'HS512', secret: secret}),
    };
  }

  verifed(token: string){
    
    Logger.debug(`decode :: ${JSON.stringify(this.jwtService.decode(token))}`);

    const pass = this.jwtService.verify(token, {secret: Buffer.from(jwtConstants.secret, 'base64').toString('ascii')});

    Logger.debug(`pass :: ${JSON.stringify(pass)}`);

    return pass;
  }

}
