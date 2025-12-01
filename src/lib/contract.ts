// Smart Contract ABI and Address for Base Sepolia
// Get contract address from environment variable, fallback to zero address
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

if (!import.meta.env.VITE_CONTRACT_ADDRESS || contractAddress === '0x0000000000000000000000000000000000000000') {
  console.warn(
    '⚠️ Smart Contract Address is not configured!\n' +
    'Please create a .env file with VITE_CONTRACT_ADDRESS=your_contract_address\n' +
    'Deploy the contract first using Remix IDE (see SETUP.md for instructions)'
  );
}

export const CONTRACT_ADDRESS = contractAddress;

export const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "purchase",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "PurchaseCompleted",
    "type": "event"
  }
] as const;
