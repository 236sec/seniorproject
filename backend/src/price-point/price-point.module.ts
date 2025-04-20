import { Module } from '@nestjs/common';
import { PricePointService } from './price-point.service';
import { PricePointController } from './price-point.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PricePoint, PricePointSchema } from './schemas/price-point.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PricePoint.name, schema: PricePointSchema },
    ]),
  ],
  controllers: [PricePointController],
  providers: [PricePointService],
})
export class PricePointModule {}
