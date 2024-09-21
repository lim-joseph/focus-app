import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;


    @Column('int', { name: 'morning_routine_streak', nullable: false, default: 0 })
    morningRoutineStreak: number
    @Column('int', { name: 'evening_routine_streak', nullable: false, default: 0 })
    eveningRountineStreak: number
    @Column('int', { name: 'focus_session_streak', nullable: false, default: 0 })
    focusSessionStreak: number


    @ManyToMany(() => UserEntity)
    @JoinTable({
        name: 'user_friends',
        joinColumn: {
            name: 'user_email',
            referencedColumnName: 'email'
        },
        inverseJoinColumn: {
            name: 'friend_email',  // Renaming the column for the friend
            referencedColumnName: 'email'  // Referring to 'email' in the UserEntity
        }
    })
    friends: UserEntity[];

}