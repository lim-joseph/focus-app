import { Test, TestingModule } from '@nestjs/testing';
import { DailyStateController } from './daily-state.controller';

describe('DailyStateController', () => {
  let controller: DailyStateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyStateController],
    }).compile();

    controller = module.get<DailyStateController>(DailyStateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
