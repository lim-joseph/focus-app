import { Controller, Post, Body, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from '../user/dtos/user.dto';
import { UserLoginDto } from './dtos/user-login.dto';
import { ApiOkResponse, ApiBadRequestResponse, ApiUnauthorizedResponse, ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiOkResponse({
        description: 'User login successful',
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid email or password',
    })
    @ApiBadRequestResponse({
        description: 'Bad Request',
    })
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    example: 'johndoe@email.com',
                },
                password: {
                    type: 'string',
                    example: 'password123',
                },
            },
        },
    })
    async userLogin(@Body() userLoginDto: UserLoginDto) {
        return this.authService.validateUser(userLoginDto);
    }

    @Post('register')
    @ApiOkResponse({
        description: 'User registration successful',
    })
    @ApiBadRequestResponse({
        description: 'Email already exists',
    })
    async userRegister(@Body() userRegisterDto: UserRegisterDto) {
        return this.authService.registerUser(userRegisterDto);
    }
}
