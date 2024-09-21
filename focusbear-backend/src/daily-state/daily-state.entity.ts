import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'daily_stats' })
export class DailyStatsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @Column()
    date: Date;

    @Column('float', { name: 'morning_routine_completion_percentage' })
    morningRoutineCompletionPercentage: number;

    @Column('float', { name: 'evening_routine_completion_percentage' })
    eveningRoutineCompletionPercentage: number;

    @Column('int', { name: 'minutes_in_focus_sessions' })
    minutesInFocusSessions: number;
}