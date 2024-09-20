import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags, ApiBody, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dtos/user-login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }


    @Post('login')
    @ApiOkResponse({
        description: 'User login',
    })
    @ApiConsumes('application/x-www-form-urlencoded')  // Specify form submission
    @ApiBody({
        description: 'Login form submission',
        schema: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    example: 'john.doe@example.com',
                },
                password: {
                    type: 'string',
                    example: 'password123',
                },
            },
        },
    })
    async userLogin(
        @Body() UserLoginDto: UserLoginDto
    ) {
        const user = await this.authService.validateUser(UserLoginDto);
        return user;

    }



}
