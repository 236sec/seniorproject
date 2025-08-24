import {
  IsString,
  IsOptional,
  IsEnum,
  IsEthereumAddress,
} from 'class-validator';

export enum PriceChartPeriod {
  H24 = '24h',
  D7 = '7d',
  M1 = '1m',
  Y1 = '1y',
}

export class GetCoinPriceChartsDto {
  @IsString()
  coinId: string;

  @IsEnum(PriceChartPeriod)
  period: PriceChartPeriod;
}
