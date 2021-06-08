import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupsRepository } from './repository/groups.repository';


@Injectable()
export class GroupsService {
  
  constructor(
    @InjectRepository(GroupsRepository)
    private GroupsRepository: GroupsRepository,
  ) {}

  // // ======= 조회 =====================================
  // findAll(): Promise<User[]> {
  //   return this.usersRepository.find();
  // }

  // findOne(userId: string): Promise<User> {
  //   return this.usersRepository.findOneByUserId(userId);
  // }

  // findText(findtext: string): Promise<User[]> {
  //   return this.usersRepository.findTextUser(findtext);
  // }
  // // ======= 조회 =====================================

  // // ======= 생성 =====================================
  // async create(data: CreateUserDto): Promise<User> {
  //   const isExist = await this.findOne(data.userId);
   
  //   if (isExist) {
  //     throw new ForbiddenException({ // response로 exception 보내기
  //       statusCode: HttpStatus.FORBIDDEN,
  //       message: [`이미 등록된 사용자입니다.`],
  //       error: 'Forbidden',
  //     });
  //   }
    
  //   try {
  //     return this.usersRepository.createUser(data);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async update(id: string, updateUserDto: UpdateUserDto){
  //  try {
     
  //    await this.usersRepository.editUser(id, updateUserDto);

  //  } catch (error) {
  //    throw error
  //  }
  // }
  // // ======= 생성 =====================================

  // // ======= 삭제 =====================================
  // async remove(id: string): Promise<void> {
  //   const user = await this.usersRepository.findOneByUserId(id);
  //   if(!user){
  //     throw new NotFoundException({ // response로 exception 보내기
  //       statusCode: HttpStatus.NOT_FOUND,
  //       message: [`사용자가 없습니다.`],
  //     });
  //   }

  //   try {
  //     await this.usersRepository.delete(user);
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  // // ======= 삭제 =====================================
}