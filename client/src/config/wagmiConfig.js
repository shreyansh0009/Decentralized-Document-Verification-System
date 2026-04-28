import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { polygonAmoy } from 'wagmi/chains';
import { defineChain } from 'viem';

// Define Hardhat local chain
const hardhat = defineChain({
  id: 31337,
  name: 'Hardhat Local',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: { http: ['http://127.0.0.1:8545'] },
  },
});

// Get a free WalletConnect Cloud project ID at: https://cloud.walletconnect.com
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_WALLETCONNECT_PROJECT_ID';

// Determine which network to use (default to Hardhat if available, otherwise Polygon Amoy)
const useHardhat = import.meta.env.VITE_USE_HARDHAT === 'true';
const selectedChain = useHardhat ? hardhat : polygonAmoy;
const rpcUrl = useHardhat 
  ? 'http://127.0.0.1:8545'
  : (import.meta.env.VITE_POLYGON_RPC_URL || 'https://rpc-amoy.polygon.technology/');

export const wagmiConfig = getDefaultConfig({
  appName: 'Decentralized Document Verification System',
  projectId,
  chains: [hardhat, polygonAmoy],
  transports: {
    [hardhat.id]: http('http://127.0.0.1:8545'),
    [polygonAmoy.id]: http(rpcUrl),
  },
  ssr: false,
});
