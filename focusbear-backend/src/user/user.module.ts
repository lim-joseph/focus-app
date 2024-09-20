import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])  // Register the UserEntity with TypeORM
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]  // Export the UserService
})
export class UserModule { }
