import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate, IsInt, IsPositive } from 'class-validator';

export class DailyState {
    @ApiProperty({ description: 'The unique identifier for the user' })
    @IsNumber()
    user_id: number;

    @ApiProperty({ description: 'The date for the daily stats' })
    @IsDate()
    date: Date;

    @ApiProperty({ description: 'Morning routine completion percentage (0-100)' })
    @IsNumber()
    @IsPositive()
    morningRoutineCompletionPercentage: number;

    @ApiProperty({ description: 'Evening routine completion percentage (0-100)' })
    @IsNumber()
    @IsPositive()
    eveningRoutineCompletionPercentage: number;

    @ApiProperty({ description: 'Total minutes spent in focus sessions' })
    @IsInt()
    @IsPositive()
    minutesInFocusSessions: number;
}
