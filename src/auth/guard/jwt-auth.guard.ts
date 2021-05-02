import { Logger } from '@nestjs/common';
import { Injectable, ExecutionContext, UnauthorizedException, LoggerService } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    
    canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        Logger.debug(`[JwtAuthGuard] :: [canActivate]`);

        const request = context.switchToHttp().getRequest();
        Logger.debug(`[JwtAuthGuard] :: [canActivate] :: request.url = ${request.url}`);
        Logger.debug(`[JwtAuthGuard] :: [canActivate] :: request.method = ${request.method}`);
        if(request.url == '/login'){
            return true; // 로그인의 경우 guard 영향 제외
        }
        if(request.url == '/users' && request.method =='POST'){
            return true; // 회원가입의 경우 guard 영향 제외
        }
        return super.canActivate(context);
    }
    
    handleRequest(err, user, info) {
        // You can throw an exception based on either "info" or "err" arguments
        Logger.debug(`[JwtAuthGuard] :: [handleRequest]`);
        Logger.debug(`[JwtAuthGuard] :: [handleRequest] :: ${JSON.stringify(user)}`);

        if (err || !user) {
            Logger.debug(`[JwtAuthGuard] :: [handleRequest] :: ${err}`);
            Logger.debug(`[JwtAuthGuard] :: [handleRequest] :: ${info}`);
            throw err || new UnauthorizedException();
        }
        return user;
    }
}