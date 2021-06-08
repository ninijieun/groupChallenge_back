import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('groups')
@ApiBearerAuth()
@Controller('groups')
export class GroupsController {

    constructor(
        // private usersService: UsersService,
    ) { }

    // /**
    //  * 전체조회 findAllUsers()
    //  * @param 
    //  * @returns CreateUserDto[]
    //  */
    // @Get()
    // findAllUsers() {
    //     return this.usersService.findAll();
    // }

    // /**
    //  * 이름, id 찾기 findUsers()
    //  * @param findtext: string
    //  * @returns User[]
    //  */
    // @Get('find/:findtext')
    // findUsers(@Param('findtext') findtext: string) {
    //     return this.usersService.findText(findtext.trim());
    // }

    // /**
    // * 회원정보 수정 updateUser()
    // * @param id: string - userId / UserDto
    // * @returns CreateUserDto
    // */
    // @Put()
    // updateUser(@LoginUser('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
    //     return this.usersService.update(userId, updateUserDto);
    // }

    // /**
    //  * 회원탈퇴 removeUser()
    //  * @param id: string - userId
    //  * @returns 
    //  */
    // @Delete(':id')
    // async removeUser(@Param('id') id: string) {
    //     try {
    //         await this.usersService.remove(id);
    //     } catch (error) {
    //         Logger.error(`error >>> ${error}`);
    //         Logger.error(`error >>> ${JSON.stringify(error)}`);

    //         throw error;
    //     }
    // }
}
