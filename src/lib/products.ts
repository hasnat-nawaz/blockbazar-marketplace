export interface Product {
  id: string;
  name: string;
  description: string;
  price: string; // in ETH
  category: 'Hardware' | 'Displays' | 'Apparel' | 'Accessories';
  image: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Crypto Mining Rig Pro',
    description: 'High-performance mining rig with 8 GPUs optimized for blockchain operations',
    price: '2.5',
    category: 'Hardware',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80'
  },
  {
    id: '2',
    name: 'Blockchain Developer Monitor',
    description: '4K Ultra-wide display perfect for coding and monitoring blockchain transactions',
    price: '0.8',
    category: 'Displays',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80'
  },
  {
    id: '3',
    name: 'Web3 Developer Hoodie',
    description: 'Premium cotton hoodie with blockchain-inspired design',
    price: '0.15',
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80'
  },
  {
    id: '4',
    name: 'Hardware Wallet Pro',
    description: 'Secure hardware wallet for storing your crypto assets',
    price: '0.25',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80'
  },
  {
    id: '5',
    name: 'RGB Mechanical Keyboard',
    description: 'Mechanical keyboard with RGB backlighting and blockchain-themed keycaps',
    price: '0.4',
    category: 'Hardware',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80'
  },
  {
    id: '6',
    name: 'Portable Trading Display',
    description: 'Portable monitor perfect for tracking markets on the go',
    price: '0.6',
    category: 'Displays',
    image: 'https://images.unsplash.com/photo-1527443195645-1133f7f28990?w=800&q=80'
  },
  {
    id: '7',
    name: 'DeFi T-Shirt Collection',
    description: 'Set of 3 premium t-shirts with DeFi-inspired designs',
    price: '0.1',
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'
  },
  {
    id: '8',
    name: 'USB-C Crypto Stick',
    description: 'Encrypted USB drive for secure key storage',
    price: '0.08',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=800&q=80'
  },
];
