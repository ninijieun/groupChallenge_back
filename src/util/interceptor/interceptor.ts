import { TimeoutInterceptor } from './timeout.interceptor';
import { LoggingInterceptor } from './logging-interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

// TODO 다중 interceptor 적용내용 체크
export const interceptorProviders = 
   [
    { // logging
        provide: APP_INTERCEPTOR,
        useClass: LoggingInterceptor,
        multi: true,
    },
    { // timeout
        provide: APP_INTERCEPTOR,
        useClass: TimeoutInterceptor,
        multi: true,
    },    
];