import { Module } from '@nestjs/common';
import { PricePointService } from './price-point.service';
import { PricePointController } from './price-point.controller';

@Module({
  controllers: [PricePointController],
  providers: [PricePointService],
})
export class PricePointModule {}
