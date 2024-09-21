import { Module } from '@nestjs/common';
import { DailyStateController } from './daily-state.controller';
import { DailyStatService } from './daily-state.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { DailyStatsEntity } from './daily-state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DailyStatsEntity, UserEntity])],
  controllers: [DailyStateController],
  providers: [DailyStatService]
})
export class DailyStateModule { }

