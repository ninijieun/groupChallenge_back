import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty() // swagger tag
    userId: string;
    userName: string;
    @ApiProperty()
    password: string; 

    // 권한
}