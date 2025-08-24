interface TokenPrice {
  currency: string;
  value: string;
  lastUpdatedAt: string;
}

// Token Metadata
interface TokenMetadata {
  symbol: string | null;
  decimals: number | null;
  name: string | null;
  logo: string | null;
}

// Individual Token Data
interface Token {
  address: string;
  network: string;
  tokenAddress: string | null;
  tokenBalance: string;
  tokenMetadata: TokenMetadata;
  tokenPrices: TokenPrice[];
}

// Main Data Container
interface AlchemyTokenData {
  tokens: Token[];
  pageKey: string | null;
}

// Complete Alchemy API Response
interface getTokensDataByWalletResponse {
  data: AlchemyTokenData;
}
