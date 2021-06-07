import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from 'nestjsx-automapper';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { UsersModule } from './modules/users/users.module';
import { AllExceptionsFilter } from './util/filter/all-exception.filter';
import { LoggingInterceptor } from './util/interceptor/logging-interceptor';

@Module({
  providers:[
    { // error filter
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide : APP_INTERCEPTOR,
      useClass: LoggingInterceptor, // TODO : muiltiple 연결 확인 필요
    },
    {
      provide : APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [
    TypeOrmModule.forRoot(),
    // MongooseModule.forRoot('mongodb://localhost/testdb'), - typeorm 사용으로 사용 안함.
    UsersModule,
    AuthModule,
    AutomapperModule.withMapper()
  ],
  controllers: [AppController],
})
export class AppModule {
  constructor(private connection: Connection) {}

}
