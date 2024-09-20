import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserLoginDto } from './dtos/user-login.dto'
import { UserRegisterDto } from '../user/dtos/user.dto';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser({ email, password }: UserLoginDto): Promise<any> {
        const user = await this.userService.findOne({ email });

        // Validate user credentials
        if (user && user.password === password) {
            const { password, ...result } = user;
            // Generate JWT token after successful validation
            const token = this.jwtService.sign({ userId: user.id, email: user.email });

            return {
                ...result,
                token,  // Return the token to the client
            };
        } else {
            throw new UnauthorizedException('Invalid email or password');
        }
    }

    async registerUser(userRegisterDto: UserRegisterDto) {
        const existingUser = await this.userService.findOne({ email: userRegisterDto.email });

        // Check for existing user
        if (existingUser) {
            throw new BadRequestException('Email already exists');
        }

        const newUser = await this.userService.createUser(userRegisterDto)

        // Generate JWT token for the new user
        const token = this.jwtService.sign({ userId: newUser.id, email: newUser.email });

        return {
            ...newUser,
            token, // Return the token along with user data
        };
    }
}
