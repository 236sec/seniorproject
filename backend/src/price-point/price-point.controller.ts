import { Controller, Get, Param, Delete, Query } from '@nestjs/common';
import { PricePointService } from './price-point.service';

@Controller('price-point')
export class PricePointController {
  constructor(private readonly pricePointService: PricePointService) {}
  @Get()
  findAll() {
    return this.pricePointService.findAll();
  }

  @Get(':coinId')
  async getCoinPriceHistory(
    @Param('coinId') coinId: string,
    @Query('limit') limit?: number,
    @Query('sort') sort?: 'asc' | 'desc',
  ) {
    return this.pricePointService.findCoin(coinId, limit, sort);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pricePointService.delete(+id);
  }
}
