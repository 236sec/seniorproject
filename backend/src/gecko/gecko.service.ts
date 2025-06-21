import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Cache } from 'cache-manager';
import {
  MarketChartResponse,
  PriceDataPoint,
  VolumeDataPoint,
} from './model/gecko.model';
import { PriceChartPeriod } from './dto/getCoinPriceCharts.dto';

@Injectable()
export class GeckoService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {}

  private API_KEY: string | undefined;
  private readonly logger = new Logger();

  onModuleInit() {
    this.API_KEY = this.configService.get<string>('COINGECKO_API_KEY');
  }

  async getPriceData(coidId: string, period: PriceChartPeriod) {
    const cached = await this.cacheManager.get(
      `${coidId}:price_data:${period}`,
    );
    if (cached) {
      return cached;
    }
    const result = await this.fetchAndUpdatePricesHours(coidId, period);
    if (!result) {
      throw new InternalServerErrorException('Failed to fetch price data');
    }
    const { priceData } = result;
    await this.cacheManager.set(
      `${coidId}:price_data:${period}`,
      priceData,
      600 * 1000,
    );
    return priceData;
  }

  async fetchAndUpdatePricesHours(
    coinId: string = 'bitcoin',
    period: PriceChartPeriod = PriceChartPeriod.H24,
  ) {
    try {
      let days = 2;
      if (period === PriceChartPeriod.H24) {
        days = 2;
      } else if (period === PriceChartPeriod.D7) {
        days = 7;
      } else if (period === PriceChartPeriod.M1) {
        days = 30;
      } else if (period === PriceChartPeriod.Y1) {
        days = 365;
      }
      const response = await axios.get<MarketChartResponse>(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
        {
          params: {
            vs_currency: 'usd',
            days: days,
            // interval: 'hourly',
            precision: 2,
          },
          headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': this.API_KEY ? this.API_KEY : '',
          },
        },
      );

      if (response.status !== 200) {
        throw new InternalServerErrorException(
          'Failed to fetch prices from CoinGecko',
        );
      }
      // Extract price data from response
      const priceData: PriceDataPoint[] = response.data?.prices || [];
      // const volumeData: VolumeDataPoint[] = response.data?.total_volumes || [];
      this.logger.log(
        `Fetched price data points ${coinId} ${days}: ${priceData.length}`,
      );

      return {
        priceData,
      };
    } catch (error) {
      this.logger.error(
        'Failed to fetch url',
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart`,
      );
      this.logger.error('Failed to fetch prices', error);
    }
  }
}
