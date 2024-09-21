import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';

import UserSeeder from './user.seed';
import DailyStateSeeder from './daily-state.seed';  // Update the path accordingly
import userFactory from '../factories/user.factory';
import dailyStatsFactory from '../factories/daily-state.factory';

export default class InitSeeder {
    public async run(dataSource: DataSource): Promise<void> {
        await runSeeders(dataSource, {
            seeds: [UserSeeder, DailyStateSeeder],  // Ensure you are using the correct seeder names
            factories: [userFactory, dailyStatsFactory],  // Ensure factory paths are correct
        });
    }
}
