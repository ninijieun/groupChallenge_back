import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { ObjectMapper } from './../../../dto/object.mapper';
import { CreateUserDto, UpdateUserDto } from './../../../dto/user.dto';

/* 커스텀 Repository https://dev.to/tony133/simple-example-custom-repository-with-nestjs-7-x-and-typeorm-3c9o */
@Injectable()
@EntityRepository(User)
export class UserRepository extends Repository<User> {
   
    public async findTextUser(findtext: string): Promise<User[]> {
        return await this.find({
          where: {
            $or:[ // or
              { user_id : {$regex: new RegExp(findtext)}, }, // like 검색
              { user_name : {$regex: new RegExp(findtext)},}
            ]
          }
        });
    }

    public async findOneByUserId(userId: string): Promise<User> {
        return await this.findOne({
          where: { 
            userId
          }});
    }

    public async findIds(userIds: string[]): Promise<User[]> {
        return await this.find({
          where:{
            userId: {$in: userIds}
          }
        });
    }


    public async createUser(
        createUserDto: CreateUserDto,
    ): Promise<User> {
        
      const user = await this.create(createUserDto);
      await user.hashPassword();

      await this.save(user);

      return user;
    }

    public async editUser(
        userId: string,
        updateUserDto: UpdateUserDto,
    ): Promise<void> {
      let user = await this.findOneByUserId(userId);
      
      if (!user) {
        throw new NotFoundException({ // response로 exception 보내기
          statusCode: HttpStatus.NOT_FOUND,
          message: [`사용자가 없습니다.`],
        });
      }
      
      user = ObjectMapper.mappedValues(updateUserDto, user, {skip: ['friends']});
      if(updateUserDto.password){
        await user.hashPassword();
      }
      
      this.save(user);
    }

}