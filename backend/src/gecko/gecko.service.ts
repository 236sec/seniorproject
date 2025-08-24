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
  CryptocurrencyArrayResponse,
} from './model/gecko.model';
import { PriceChartPeriod } from './dto/getCoinPriceCharts.dto';

@Injectable()
export class GeckoService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService,
  ) {}

  private API_KEY: string | undefined;
  private readonly logger = new Logger(GeckoService.name);

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
    const result = await this.fetchAndPricesCharts(coidId, period);
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

  async getCoinMarket() {
    const cached = await this.cacheManager.get('coin_market');
    if (cached) {
      return cached;
    }
    const result = await this.fetchListCoinMarket();
    if (!result) {
      throw new InternalServerErrorException(
        'Failed to fetch coin market data',
      );
    }
    await this.cacheManager.set('coin_market', result, 600 * 1000);
    return result;
  }

  async fetchListCoinMarket() {
    try {
      const response = await axios.get<CryptocurrencyArrayResponse>(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 30,
            page: 1,
            sparkline: false,
            price_change_percentage: '1h,24h,7d',
          },
          headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': this.API_KEY ? this.API_KEY : '',
          },
        },
      );

      if (response.status !== 200) {
        throw new InternalServerErrorException(
          'Failed to fetch market data from CoinGecko',
        );
      }

      this.logger.log(`Fetched market data points: ${response.data.length}`);

      return response.data;
    } catch (error) {
      this.logger.error('Failed to fetch market data', error);
      throw new InternalServerErrorException('Failed to fetch market data');
    }
  }

  async fetchAndPricesCharts(
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
