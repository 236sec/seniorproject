import { Test, TestingModule } from '@nestjs/testing';
import { PricePointService } from './price-point.service';

describe('PricePointService', () => {
  let service: PricePointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PricePointService],
    }).compile();

    service = module.get<PricePointService>(PricePointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
