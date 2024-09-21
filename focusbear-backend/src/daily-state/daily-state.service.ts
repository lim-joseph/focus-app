import { Injectable, } from '@nestjs/common';
import { DailyStatsEntity } from './daily-state.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DailyState } from './dtos/daily-state.dto';
@Injectable()
export class DailyStatService {
    constructor(
        @InjectRepository(DailyStatsEntity)
        private dailyStatsRepository: Repository<DailyStatsEntity>,
    ) { }

    async create(dailyStats: DailyState) {
        const newDailyStats = this.dailyStatsRepository.create({
            ...dailyStats,
            user: { id: dailyStats.user_id },
        });

        return await this.dailyStatsRepository.save(newDailyStats);
    }

    findAll(user_id: number) {
        return this.dailyStatsRepository.find({
            where: {
                user: { id: user_id },
            },
            relations: ['user'],
        });
    }

    async findByUserIdAndDate(userId: number, date: Date): Promise<DailyStatsEntity> {

        const dailyState = await this.dailyStatsRepository.findOne({
            where: {
                user: { id: userId },
                date: date,
            },
        });

        return dailyState


    }
}

