import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './../auth.constant';
import { AuthService } from './../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Buffer.from(jwtConstants.secret, 'base64').toString('ascii'),
      algorithms: 'HS512',
    });
  }

  async validate(payload: any) {
    Logger.debug(`[JwtStrategy] :: [validate]`);
    const user = await this.authService.validateUser(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }

    if(user.userId != payload.userId){
      throw new UnauthorizedException();
    }
    return user;
  }
}