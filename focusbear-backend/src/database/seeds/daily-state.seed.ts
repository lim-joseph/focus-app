import { DailyStatsEntity } from 'src/daily-state/daily-state.entity';
import { UserEntity } from 'src/user/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class DailyStatsSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<void> {
        const userRepository = dataSource.getRepository(UserEntity);

        // Fetch all users from the database
        const users = await userRepository.find();

        if (users.length === 0) {
            console.error('No users found. Cannot create daily stats without users.');
            return;
        }

        // Get the factory for DailyStatsEntity
        const dailyStatsFactory = await factoryManager.get(DailyStatsEntity);

        // Create and save 50 mock daily stats, each assigned to a random user
        const dailyStats = [];
        for (let i = 0; i < 50; i++) {
            const dailyStat = await dailyStatsFactory.make();
            dailyStat.user = users[Math.floor(Math.random() * users.length)];
            dailyStats.push(dailyStat);
        }
        await dataSource.getRepository(DailyStatsEntity).save(dailyStats); // Save 50 mock daily stats
    }
}


