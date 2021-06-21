import { Column, Entity, Unique } from 'typeorm';
import { BasicEntity } from './basic.entity';

@Entity({ name: 'groups' })
export class Group extends BasicEntity {

  /** 그룹명 */
  @Column()
  name: string;
  
  // TODO 추가 예정
  ///** 그룹사진 */
  // @Column()
	// image: files

  /** 그룹 정보 */
  @Column()
	info: string;

  /** 그룹 시작일 : yyyyMMdd */
  @Column({length:8})
	startDate: string;

  /** 그룹 종료일: yyyyMMdd */
  @Column({length:8})
	endDate: string;
  
  /** 그룹 체크주기 */
  @Column()
  jugi: number;
  // TODO enum : 월 / 주 / 일

  /** 그룹 체크일자 */
  @Column({length:2})
	checkDay: number;

  /** 그룹 공개여부 */
  @Column()
	isPublic: boolean;

  /** 그룹 규칙 */
  @Column()
	rules: string[];

  // @Column(type => Files)
  // mainPhoto: Files;
  // @Column(type => Files)
  // backgroundPhoto: Files;

  /** 초대코드 */
  // @Column({unique: true})
	// invitedCode: string;

  // /** 초대코드 생성 */
  // async getInvitedCode(): Promise<void> {      
  //     this.invitedCode = Math.random().toString(36).substr(2, 11);
  // }

}