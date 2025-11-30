import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { baseSepolia } from 'wagmi/chains';
import { http } from 'wagmi';

// Get WalletConnect Project ID from environment variable
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

if (!projectId) {
  console.error(
    '⚠️ WalletConnect Project ID is missing!\n' +
    'Please create a .env file with VITE_WALLETCONNECT_PROJECT_ID=your_project_id\n' +
    'Get your Project ID from https://cloud.walletconnect.com/'
  );
}

export const config = getDefaultConfig({
  appName: 'BlockBazar',
  projectId: projectId || 'YOUR_PROJECT_ID', // Fallback for development
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
  ssr: false,
});
