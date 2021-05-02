import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Global() // the module global-scoped.
@Module({
    imports: [TypeOrmModule.forFeature([UserRepository])],
    exports:[TypeOrmModule, UsersService],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {  
}
