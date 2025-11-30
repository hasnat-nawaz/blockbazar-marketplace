import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { baseSepolia } from 'wagmi/chains';
import { http } from 'wagmi';

export const config = getDefaultConfig({
  appName: 'BlockBazar',
  projectId: 'YOUR_PROJECT_ID', // Get from WalletConnect Cloud
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
  ssr: false,
});
