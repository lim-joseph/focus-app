import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }


    @Get()
    getUser(): string {
        return 'Hello World!';
    }

    @Post('add-friend')
    @ApiOperation({ summary: 'Add a friend for the user' })
    @ApiBody({
        description: 'User IDs to establish a friendship',
        schema: {
            type: 'object',
            properties: {
                userEmail: {
                    type: 'email',
                    example: "jonedoe@email.com",
                    description: 'The email of the user to add a friend to',
                },
                friendEmail: {
                    type: 'email',
                    example: 'alice@email.com',
                    description: 'the email of the friend to add',
                },
            },
        },
    })
    @ApiResponse({
        status: 201,
        description: 'Friendship successfully created.',
    })
    @ApiResponse({
        status: 404,
        description: 'User or friend not found.',
    })
    addFriend(@Body() body: { userEmail: string, friendEmail: string }) {
        console.log(body)
        const user = this.userService.addFriendByEmail(body.userEmail, body.friendEmail);
        return { message: user };
    }



    @Get(':email')
    @ApiOperation({ summary: 'Get a user and their friends by email' })
    @ApiResponse({
        status: 200,
        description: 'Returns the user and their friends.',
        schema: {
            type: 'object',
            properties: {
                id: { type: 'number', example: 1 },
                email: { type: 'string', example: 'user1@example.com' },
                name: { type: 'string', example: 'John Doe' },
                friends: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 2 },
                            email: { type: 'string', example: 'friend@example.com' },
                            name: { type: 'string', example: 'Jane Doe' },
                        },
                    },
                },
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'User not found.',
    })
    async getUserWithFriends(@Param('email') email: string) {
        const user = await this.userService.getUserWithFriends(email);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}
