import { Body, Controller, Post, Get, Headers, NotFoundException, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiHeader, ApiBody } from '@nestjs/swagger';
import { DailyState } from './dtos/daily-state.dto';
import { DailyStatService } from './daily-state.service';
import { DailyStatsEntity } from './daily-state.entity';
@ApiTags('Daily Stats')
@Controller('daily-stats')
export class DailyStateController {
    constructor(private readonly dailyStatsService: DailyStatService) { }

    @Post()
    @ApiOperation({ summary: 'Insert a daily stat for a user' })
    @ApiResponse({
        status: 201,
        description: 'The daily stat has been successfully created.',
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                user_id: {
                    type: 'number',  // Should be a number based on the DTO
                    example: 1,  // Example user ID
                },
                date: {
                    type: 'string',
                    format: 'date-time',
                    example: '2024-09-21',
                },
                morningRoutineCompletionPercentage: {
                    type: 'number',
                    example: 85.5,  // Example completion percentage
                },
                eveningRoutineCompletionPercentage: {
                    type: 'number',
                    example: 90.0,  // Example completion percentage
                },
                minutesInFocusSessions: {
                    type: 'integer',
                    example: 120,  // Example focus session duration in minutes
                },
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Invalid input data.',
    })
    async insertDailyStat(@Body() dailyStats: DailyState) {
        // Call service to handle business logic, return the result
        return await this.dailyStatsService.create(dailyStats);
    }



    @Get(':date')
    @ApiOperation({ summary: 'Get daily stats for a specific date' })
    @ApiParam({ name: 'date', description: 'The date of the daily stats in YYYY-MM-DD format' })
    @ApiHeader({ name: 'user_id', description: 'The ID of the user', required: true })
    @ApiResponse({ status: 200, description: 'The daily stats for the user' })
    @ApiResponse({ status: 404, description: 'Daily stats not found' })
    async getDailyState(
        @Param('date') date: string,
        @Headers('user_id') userId: number,
    ): Promise<DailyStatsEntity> {
        const parsedDate = new Date(date)
        const dailyStat = await this.dailyStatsService.findByUserIdAndDate(userId, parsedDate);

        if (!dailyStat) {
            throw new NotFoundException('Daily stats not found');
        }

        return dailyStat;
    }
}
