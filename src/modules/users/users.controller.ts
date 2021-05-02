import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dto/user.dto';
import { LoginUser } from 'src/util/decorator/user.decorator';
import { UpdateUserDto } from './../../dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {

    constructor(
        private usersService: UsersService,
    ) { }

    /**
     * 회원가입 createUsers()
     * @param CreateUserDto
     * @returns CreateUserDto
     */
    @Post() // post는 return 201
    async createUsers(@Body() createUserDto: CreateUserDto) {
        try {
            await this.usersService.create(createUserDto)

            return createUserDto;
        } catch (error) {

            Logger.error(`error >>> ${error}`);
            Logger.error(`error >>> ${JSON.stringify(error)}`);

            throw error;
        }
    }


    /**
     * 전체조회 findAllUsers()
     * @param 
     * @returns CreateUserDto[]
     */
    @Get()
    findAllUsers() {
        return this.usersService.findAll();
    }

    /**
     * 이름, id 찾기 findUsers()
     * @param findtext: string
     * @returns User[]
     */
    @Get('find/:findtext')
    findUsers(@Param('findtext') findtext: string) {
        return this.usersService.findText(findtext.trim());
    }

    /**
    * 회원정보 수정 updateUser()
    * @param id: string - userId / UserDto
    * @returns CreateUserDto
    */
    @Put()
    updateUser(@LoginUser('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(userId, updateUserDto);
    }

    /**
     * 회원탈퇴 removeUser()
     * @param id: string - userId
     * @returns 
     */
    @Delete(':id')
    async removeUser(@Param('id') id: string) {
        try {
            await this.usersService.remove(id);
        } catch (error) {
            Logger.error(`error >>> ${error}`);
            Logger.error(`error >>> ${JSON.stringify(error)}`);

            throw error;
        }
    }
}
