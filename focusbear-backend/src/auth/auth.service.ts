import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserLoginDto } from './dtos/user-login.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ) { }

    async validateUser({ email, password }: UserLoginDto): Promise<any> {
        const user = await this.userService.findOne({ email: email });
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        } else {
            throw new BadRequestException('Invalid email or password');
        }

    }
}
