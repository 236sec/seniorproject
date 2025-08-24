import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AlchemyService } from './alchemy.service';
import { Public } from 'src/auth/decorators/public.decorator';
import { GetTokenByWalletDto } from './dto/getTokenByWallet.dto';

@Controller('alchemy')
export class AlchemyController {
  constructor(private readonly alchemyService: AlchemyService) {}

  @Public()
  @Post(':walletAddress/tokens')
  async getTokensByWallet(@Body() getTokenByWalletDto: GetTokenByWalletDto) {
    try {
      const data = await this.alchemyService.getTokensByWallet(
        getTokenByWalletDto.walletAddress,
        getTokenByWalletDto.networks,
      );
      return data;
    } catch (error) {
      if (error.message === 'Invalid wallet address') {
        return { message: 'Invalid wallet address' };
      } else if (error.message === 'Internal server error') {
        return { message: 'Internal server error' };
      } else {
        return { message: 'Unknown error' };
      }
    }
  }
}
