import {
  IsString,
  IsOptional,
  IsEnum,
  IsEthereumAddress,
} from 'class-validator';

export enum Network {
  ETH_MAINNET = 'eth-mainnet',
  ETH_SEPOLIA = 'eth-sepolia',
  OPT_MAINNET = 'opt-mainnet',
  OPT_SEPOLIA = 'opt-sepolia',
  WORLDCHAIN_MAINNET = 'worldchain-mainnet',
}

export class GetTokenByWalletDto {
  @IsString()
  @IsEthereumAddress()
  walletAddress: string;

  @IsOptional()
  @IsEnum(Network, { each: true })
  networks: Network[];
}
