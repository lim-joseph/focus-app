import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserLoginDto } from './dtos/user-login.dto';
import { UserRegisterDto } from '../user/dtos/user.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

    async validateUser({ email, password }: UserLoginDto): Promise<any> {
        const user = await this.userService.findOne({ email });

        // Throw UnauthorizedException instead of BadRequestException for invalid credentials
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        } else {
            throw new UnauthorizedException('Invalid email or password');
        }
    }

    async registerUser(userRegisterDto: UserRegisterDto) {
        const existingUser = await this.userService.findOne({ email: userRegisterDto.email });

        // Throw BadRequestException for duplicate email
        if (existingUser) {
            throw new BadRequestException('Email already exists');
        }

        const newUser = await this.userService.createUser(userRegisterDto);
        return newUser;
    }
}
