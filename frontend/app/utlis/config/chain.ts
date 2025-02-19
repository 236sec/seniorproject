import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {getDefaultConfig,Chain,} from '@rainbow-me/rainbowkit';

const avalanche = {
  id: 31337,
  name: 'TestNet',
  iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png',
  iconBackground: '#fff',
  nativeCurrency: { name: 'Etherium', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545/'] },
  },
} as const satisfies Chain;


const chains = [mainnet, polygon, optimism, arbitrum, base, avalanche] as any;

export { chains };