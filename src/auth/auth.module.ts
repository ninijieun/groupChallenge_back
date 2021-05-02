import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/modules/users/users.module';
import { jwtConstants } from './auth.constant';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: Buffer.from(jwtConstants.secret, 'base64').toString('ascii'),
          verifyOptions: {algorithms : ['HS512']},
          signOptions: { expiresIn: '1d', algorithm:'HS512',  },
        }),
      ],
      providers: [AuthService, JwtStrategy],
      exports: [AuthService],
})
export class AuthModule {}
