import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserRegisterDto } from './dtos/user.dto';
import type { FindOptionsWhere } from 'typeorm';
@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>) { }


    async createUser(
        userRegisterDto: UserRegisterDto,
    ) {
        const user = this.userRepository.create(userRegisterDto);
        await this.userRepository.save(user);
        return user;

    }

    findOne(findData: FindOptionsWhere<UserEntity>): Promise<UserEntity | null> {
        return this.userRepository.
            findOneBy(findData);
    }

    async getUserWithFriends(email: string): Promise<any> {
        return this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.friends', 'friend')
            .select([
                'user.id',
                'user.email',
                'user.name',
                'user.morningRoutineStreak',
                'user.eveningRountineStreak',
                'user.focusSessionStreak',
                'friend.email',
                'friend.name',
                'friend.morningRoutineStreak',
                'friend.eveningRountineStreak',
                'friend.focusSessionStreak'
            ])
            .where('user.email = :email', { email })
            .getOne();
    }
    async addFriendByEmail(userEmail: string, friendEmail: string): Promise<void> {

        const user = await this.userRepository.findOne({ where: { email: userEmail }, relations: ['friends'] });
        const friend = await this.userRepository.findOne({ where: { email: friendEmail } });

        console.log("User", user);
        console.log("Friend", friend);
        if (!user || !friend) {
            throw new Error('User or friend not found');
        }
        if (user.email === friend.email) {
            throw new Error('Cannot add yourself as a friend');
        }

        if (!user.friends.some(f => f.email === friendEmail)) {
            user.friends.push(friend);
            await this.userRepository.save(user);
        }
    }


}
