import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Group } from 'src/entity/group.entity';
import { DateUtils } from 'src/util/DateUtils';
import { EntityRepository, Repository } from 'typeorm';
import { ObjectMapper } from './../../../dto/object.mapper';

/* 커스텀 Repository https://dev.to/tony133/simple-example-custom-repository-with-nestjs-7-x-and-typeorm-3c9o */
@Injectable()
@EntityRepository(Group)
export class GroupsRepository extends Repository<Group> {
   
    public async findTextGroups(findtext: string): Promise<Group[]> {
        return await this.find({
          where: {
              name : {$regex: new RegExp(findtext)}
          }
        });
    }

    public async findInvitedCode(code: string): Promise<Group> {
        return await this.findOne({
          where: { 
            invitedCode: code
          }});
    }

    /*
      eq - equal ( = )
      ne - not equal ( <> )
      lt - little ( < )
      le - little or equal ( <= )
      gt - greater ( > )
      ge - greater or equal ( >= )

      출처: https://88240.tistory.com/493 [shaking blog]
    */

    public async findPublicGroups(): Promise<Group[]> {
        return await this.find({
          where:{
            isPublic: true
          , startDate: {$le: DateUtils.getToday()}
          , endDate: {$ge: DateUtils.getToday()}
          }
        });
    }


    // public async createGroup(
    //     createGroupDto: CreateGroupDto,
    // ): Promise<Group> {
      
    //   const Group:Group = await this.create(createGroupDto);
    //   await Group.hashPassword();

    //   await this.save(Group);

    //   return Group;
    // }

    // public async editGroup(
    //     GroupId: string,
    //     updateGroupDto: UpdateGroupDto,
    // ): Promise<void> {
    //   let Group = await this.findOneByGroupId(GroupId);
      
    //   if (!Group) {
    //     throw new NotFoundException({ // response로 exception 보내기
    //       statusCode: HttpStatus.NOT_FOUND,
    //       message: [`사용자가 없습니다.`],
    //     });
    //   }
      
    //   Group = ObjectMapper.mappedValues(updateGroupDto, Group);
    //   if(updateGroupDto.password){
    //     await Group.hashPassword();
    //   }
      
    //   this.save(Group);
    // }

}