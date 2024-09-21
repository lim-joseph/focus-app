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

    create(dailyStats: DailyState) {
        return this.dailyStatsRepository.save(dailyStats);
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

