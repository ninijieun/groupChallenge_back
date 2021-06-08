import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BasicEntity } from './basic.entity';
import { Group } from './group.entity';

@Entity({ name: 'users' })
export class User extends BasicEntity {
  
  // @PrimaryColumn({name:'user_id'}) - 지원 불가인듯 하다.
  @PrimaryColumn()
  userId: string;

  @Column()
  userName: string;

  @Column({nullable: false})
  password: string;
  
  // 저장 전에 암호화
  // @BeforeInsert()
  // @BeforeUpdate()
  async hashPassword(): Promise<void> {
    try {
      
      this.password = await bcrypt.hash(this.password, 10); // 10은 round값 2^10
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(inputPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(inputPassword, this.password);
    } catch (error) {
      throw new InternalServerErrorException({
        ...error.response,
      });
    }
  }

  @Column()
  email: string;

  @Column()
  sayWord: string;

  @Column()
  fcmToken: string;

  @Column(type => Group)
  favoritGroup: Group;

  // TODO
  // @Column(type => Files)
  // profilePhoto: Files;

}