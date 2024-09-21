import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { FindOptionsWhere } from 'typeorm';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './user/dtos/user.dto';
import { UserEntity } from './user/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(userRegisterDto: UserRegisterDto) {
    const user = this.userRepository.create(userRegisterDto);
    await this.userRepository.save(user);
    return user;
  }

  findOne(findData: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
    return this.userRepository.findOneBy(findData);
  }
}
