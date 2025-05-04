import { Module } from '@nestjs/common';
import { PricePointService } from './price-point.service';
import { PricePointController } from './price-point.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PriceHistory, PriceHistorySchema } from './schemas/price-point.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PriceHistory.name, schema: PriceHistorySchema },
    ]),
  ],
  controllers: [PricePointController],
  providers: [PricePointService],
})
export class PricePointModule {}
