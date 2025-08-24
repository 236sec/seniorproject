import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AlchemyService {
  constructor(private readonly configService: ConfigService) {}

  private API_KEY: string | undefined;
  private readonly logger = new Logger(AlchemyService.name);

  onModuleInit() {
    this.API_KEY = this.configService.get<string>('ALCHEMY_API_KEY');
  }

  async getTokensByWallet(walletAddress: string, networks?: string[]) {
    try {
      const response = await axios.post<getTokensDataByWalletResponse>(
        `https://api.g.alchemy.com/data/v1/${this.API_KEY}/assets/tokens/by-address`,
        {
          headers: {
            accept: 'application/json',
          },
          body: {
            addresses: [
              {
                address: walletAddress,
                networks: networks || ['eth-mainnet'],
                withMetadata: false,
                withPrices: false,
                includeNativeTokens: true,
                includeErc20Tokens: true,
              },
            ],
          },
        },
      );

      if (response.status !== 200) {
        throw new InternalServerErrorException(
          'Failed to fetch wallet tokens from Alchemy API',
        );
      }

      this.logger.log(
        `Fetched wallet tokens data points: ${response.data.data.tokens.length}`,
      );

      return response.data;
    } catch (error) {
      this.logger.error('Failed to fetch wallet tokens', error);
      throw new InternalServerErrorException('Failed to fetch wallet tokens');
    }
  }
}
