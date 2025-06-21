import { Controller, Get, Param, Query } from '@nestjs/common';
import { GeckoService } from './gecko.service';
import { PriceChartPeriod } from './dto/getCoinPriceCharts.dto';

@Controller('gecko')
export class GeckoController {
  constructor(private readonly geckoService: GeckoService) {}

  @Get('price-charts/:coinId')
  async getCoinPriceHistory(
    @Param('coinId') coinId: string,
    @Query('period') period?: PriceChartPeriod,
  ) {
    if (!period) {
      period = PriceChartPeriod.H24;
    }
    return this.geckoService.getPriceData(coinId, period);
  }

  @Get('market')
  async getCoinMarket() {
    return this.geckoService.getCoinMarket();
  }
}
