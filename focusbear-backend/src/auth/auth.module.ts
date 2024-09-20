import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [UserModule],  // AuthModule depends on UserModule
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule { }