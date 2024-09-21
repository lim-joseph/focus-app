import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'daily_stats' })
export class DailyStatsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => UserEntity, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;


    @Column({ type: 'date', nullable: false })
    date: Date;


    @Column('float', { name: 'morning_routine_completion_percentage', nullable: false, default: 0 })
    morningRoutineCompletionPercentage: number;

    @Column('float', { name: 'evening_routine_completion_percentage', nullable: false, default: 0 })
    eveningRoutineCompletionPercentage: number;


    @Column('int', { name: 'minutes_in_focus_sessions', nullable: false, default: 0 })
    minutesInFocusSessions: number;
}