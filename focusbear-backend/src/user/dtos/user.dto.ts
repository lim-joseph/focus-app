import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty({
        description: 'The id of the user',
        example: 1,
    })
    id: number;

    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The email of the user',
        example: 'johndoe@email.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'password123',
    })
    @IsNotEmpty()
    password: string;
}