import { Column, Entity } from 'typeorm';
import { BasicEntity } from './basic.entity';
import { Group } from './group.entity';
import { User } from './user.entity';

@Entity({ name: 'members' })
export class Member extends BasicEntity {
  // TODO : join check
  // 고려해야할 조회성
  // 1. 그룹 - 멤버들 찾기
  // 2. 멤버 하나 - 그룹들 찾기

  /** 그룹 */
  @Column(type => Group)
	group: Group;

  /** 맴버 */
  @Column(type => User)
	members: User[];
}