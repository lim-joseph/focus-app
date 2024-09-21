import { Test, TestingModule } from '@nestjs/testing';
import { DailyStatService } from './daily-state.service';

describe('DailyStateService', () => {
  let service: DailyStatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyStatService],
    }).compile();

    service = module.get<DailyStatService>(DailyStatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
