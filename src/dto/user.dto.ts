import { User } from 'src/entity/user.entity';
import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty()
    userId: string;
    @ApiProperty()
    userName: string;
    @ApiProperty()
    password: string; 
    @ApiProperty()
    email: string;
    @ApiProperty()
    sayWord: string; // 한마디

}

// userId, password 를 선택사항으로 둔 dto
export class UpdateUserDto extends PartialType(
    OmitType(CreateUserDto, ['userId'] as const),
  ) {
    // @ApiProperty()
    // favoritGroup: Group; // 메인 그룹

  }
  