import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The email of the user',
        example: 'johndoe@email.com',
    })
    readonly email!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'password123',
        description: 'Password of the user',
    })
    readonly password!: string;
}