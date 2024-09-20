import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserRegisterDto } from './dtos/userRegister.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    createUser(@Body() user: UserRegisterDto) {
        return this.userService.createUser(user);

    }


    @Get()
    getUser(): string {
        return 'Hello World!';
    }
}
