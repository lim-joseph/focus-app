import { setSeederFactory } from 'typeorm-extension';
import { DailyStatsEntity } from '../../daily-state/daily-state.entity';


export default setSeederFactory(DailyStatsEntity, (faker) => {
    const dailyStat = new DailyStatsEntity();
    dailyStat.date = faker.date.recent({ days: 10 })
    dailyStat.morningRoutineCompletionPercentage = faker.number.float({ min: 0, max: 100 });
    dailyStat.eveningRoutineCompletionPercentage = faker.number.float({ min: 0, max: 100 });
    dailyStat.minutesInFocusSessions = faker.number.float({ min: 0, max: 120 });
    return dailyStat;
}
)

