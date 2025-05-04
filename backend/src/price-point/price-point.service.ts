import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  PriceHistory,
  PriceHistoryDocument,
  TimeInterval,
} from './schemas/price-point.schema';
import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import {
  MarketChartResponse,
  PriceDataPoint,
  VolumeDataPoint,
} from './model/gecko.model';

@Injectable()
export class PricePointService {
  constructor(
    @InjectModel(PriceHistory.name)
    private priceHistoryModel: Model<PriceHistoryDocument>,
    private readonly configService: ConfigService,
  ) {}
  private API_KEY: string | undefined;
  private readonly logger = new Logger(PricePointService.name);

  onModuleInit() {
    this.API_KEY = this.configService.get<string>('COINGECKO_API_KEY');
  }

  // @Cron(CronExpression.EVERY_30_SECONDS)
  // async fetchAndUpdatePricesScheduled() {
  //   this.logger.log('Running scheduled price update...');
  //   await this.fetchAndUpdatePricesHours();
  // }

  findAll(): Promise<PriceHistory[]> {
    return this.priceHistoryModel.find().exec();
  }

  /**
   * Find price history data for a specific coin
   * @param coinId - The symbol identifier for the coin (e.g., 'bitcoin')
   * @param limit - Maximum number of results to return (default: 100)
   * @param sortDirection - Sort direction for timestamp ('asc' or 'desc')
   * @returns Promise containing array of price history entries
   */
  async findCoin(
    coinId: string,
    limit: number = 100,
    sortDirection: 'asc' | 'desc' = 'desc',
  ): Promise<PriceHistory[]> {
    return this.priceHistoryModel
      .find({
        symbol: coinId,
      })
      .sort({ timestamp: sortDirection === 'asc' ? 1 : -1 })
      .limit(limit)
      .exec();
  }

  async delete(id: number): Promise<{ message: string }> {
    try {
      const result = await this.priceHistoryModel.findByIdAndDelete(id).exec();
      if (!result) {
        throw new NotFoundException(`PricePoint with ID ${id} not found`);
      }
      return { message: 'Delete Successful' };
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        'An error occurred during deletion',
      );
    }
  }

  async fetchAndUpdatePricesHours() {
    try {
      const response = await axios.get<MarketChartResponse>(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart`,
        {
          params: {
            vs_currency: 'usd',
            days: '3',
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
      this.logResponseData(priceData);
      const volumeData: VolumeDataPoint[] = response.data?.total_volumes || [];

      // Process the data and save to database
      await this.savePriceDataToDatabase(priceData, volumeData);
    } catch (error) {
      this.logger.error(
        'Failed to fetch url',
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart`,
      );
      this.logger.error('Failed to fetch prices', error);
    }
  }

  private async savePriceDataToDatabase(
    priceData: PriceDataPoint[],
    volumeData: VolumeDataPoint[],
  ): Promise<void> {
    try {
      const documents = priceData.map((pricePoint, index) => {
        // Find matching volume data by timestamp or use index if timestamps align
        const matchingVolumeData =
          volumeData.find((v) => v[0] === pricePoint[0]) || volumeData[index];

        // Use matching volume or fallback to 0 if not found
        const volume = matchingVolumeData ? matchingVolumeData[1] : 0;

        return {
          symbol: 'bitcoin',
          price: pricePoint[1],
          volume: volume,
          interval: TimeInterval.HOUR,
          timestamp: new Date(pricePoint[0]),
        };
      });

      // Check for existing documents to avoid duplicates
      for (const doc of documents) {
        const exists = await this.priceHistoryModel.exists({
          symbol: doc.symbol,
          timestamp: doc.timestamp,
        });

        if (!exists) {
          await this.priceHistoryModel.create(doc);
        }
      }

      this.logger.log(`Processed and saved ${documents.length} price points`);
    } catch (error) {
      this.logger.error('Error saving price data to database', error);
    }
  }

  private logResponseData(data: PriceDataPoint[]) {
    // Log only up to 10 price entries
    const limitedPriceData = data.slice(0, 10);

    // Log each price point in a readable format
    this.logger.log(
      `Bitcoin price data (showing ${limitedPriceData.length} entries):`,
    );
    limitedPriceData.forEach((pricePoint, index) => {
      const timestamp = new Date(pricePoint[0]).toISOString();
      const price = pricePoint[1];
      this.logger.log(`[${index + 1}] ${timestamp}: $${price}`);
    });

    // Optional: Show total number of data points received
    if (data.length > 10) {
      this.logger.log(`...and ${data.length - 10} more data points`);
    }
  }
}
