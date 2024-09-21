import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { DailyState } from './dtos/daily-state.dto';
import { DailyStatService } from './daily-state.service';

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
                    type: 'string',  // Dates are typically represented as strings
                    format: 'date-time',  // Indicate it's a date in ISO format
                    example: '2024-09-21T00:00:00Z',  // Example ISO date string
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
}
