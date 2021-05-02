import { Logger } from '@nestjs/common';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, LoggerService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 함수 앞뒤로 로깅 interceptor
    // 커스텀화

    // before
    const request = context.switchToHttp().getRequest();
    // const method = request.method;
    const url = request.originalUrl;
    // const data = request.data;


    Logger.debug(`[IN))${url}] :: url :: ${url}`);
    Logger.debug(`[IN))${url}] :: data :: ${JSON.stringify(request.params)}`);
    Logger.debug(`[IN))${url}] :: data :: ${JSON.stringify(request.body)}`);

    return next
      .handle()
      .pipe(
        tap(() => {
                const response = context.switchToHttp().getResponse();
                Logger.debug(`[OUT))${url}] :: status :: ${JSON.stringify(response.statusCode)}`);
            }
        ),
      );
  }
}