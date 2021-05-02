import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
    // exception filter 구현 - exception filter의 커스텀화
    Logger.error('AllExceptionsFilter >>>> ');
    Logger.error(` exception :: ${exception}`);
    Logger.error(` exception :: ${JSON.stringify(exception)}`);
  }
}