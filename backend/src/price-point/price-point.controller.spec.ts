import { Test, TestingModule } from '@nestjs/testing';
import { PricePointController } from './price-point.controller';
import { PricePointService } from './price-point.service';

describe('PricePointController', () => {
  let controller: PricePointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PricePointController],
      providers: [PricePointService],
    }).compile();

    controller = module.get<PricePointController>(PricePointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
