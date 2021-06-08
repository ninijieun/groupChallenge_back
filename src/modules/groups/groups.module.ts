import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { GroupsRepository } from './repository/groups.repository';

@Global() // the module global-scoped.
@Module({
    imports: [TypeOrmModule.forFeature([GroupsRepository])],
    exports:[TypeOrmModule],
    controllers: [GroupsController],
    providers: [GroupsService],
})
export class GroupsModule {  
}
