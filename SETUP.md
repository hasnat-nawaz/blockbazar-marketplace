# BlockBazar Setup Guide

## Prerequisites

- Node.js 18+ installed
- A crypto wallet (MetaMask or Coinbase Wallet)
- Base Sepolia testnet ETH (free from faucet)

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Get a WalletConnect Project ID:**
   - Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
   - Create a free account and get your Project ID
   - Create a `.env` file in the root directory
   - Add the following line: `VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here`
   - Replace `your_project_id_here` with your actual Project ID from WalletConnect Cloud

3. **Get test ETH:**
   - Visit [Base Sepolia Faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)
   - Connect your wallet
   - Request free test ETH

## Smart Contract Deployment

The project includes a simple purchase contract that needs to be deployed to Base Sepolia:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BlockBazarPurchases {
    event PurchaseCompleted(address buyer, uint totalAmount, uint timestamp);

    function purchase(uint totalAmount) public payable {
        require(msg.value == totalAmount, "Incorrect amount");
        emit PurchaseCompleted(msg.sender, totalAmount, block.timestamp);
    }
    
    // Allow contract owner to withdraw funds
    function withdraw() public {
        payable(msg.sender).transfer(address(this).balance);
    }
}
```

**Deployment Steps:**

1. **Using Remix IDE (Easiest):**
   - Go to [Remix IDE](https://remix.ethereum.org)
   - Create new file `BlockBazarPurchases.sol` with the code above
   - Compile the contract
   - Deploy tab → Environment: "Injected Provider - MetaMask"
   - Make sure MetaMask is on Base Sepolia network
   - Deploy and copy the contract address

2. **Update the contract address:**
   - Add the following line to your `.env` file: `VITE_CONTRACT_ADDRESS=your_deployed_contract_address`
   - Replace `your_deployed_contract_address` with the address you copied from Remix after deployment

## Running the App

```bash
npm run dev
```

Visit `http://localhost:5173`

## Testing the Payment Flow

1. **Connect Wallet:**
   - Click "Connect Wallet" button
   - Choose wallet (extension or mobile QR)
   - Approve the connection

2. **Add items to cart:**
   - Browse products
   - Click on a product to view details
   - Add to cart

3. **Checkout:**
   - Go to cart
   - Click "Proceed to Checkout"
   - Review your order
   - Click "Pay X ETH"
   - Confirm the transaction in your wallet

4. **View Order Status:**
   - After successful transaction, you'll be redirected
   - View transaction details and link to BaseScan

## Network Configuration

The app is configured to use Base Sepolia testnet:

- **Chain ID:** 84532
- **RPC URL:** https://sepolia.base.org
- **Block Explorer:** https://sepolia.basescan.org

## Troubleshooting

**Wallet won't connect:**
- Make sure you're on Base Sepolia network
- Try refreshing the page
- Check that you have the latest version of your wallet extension

**Transaction fails:**
- Ensure you have enough test ETH for gas fees
- Check that the contract address is correct
- Make sure you're on the right network

**Product images not loading:**
- Images are from Unsplash and require internet connection
- Replace with local images in `src/lib/products.ts` if needed

## Deployment

**Deploy to Vercel:**

```bash
npm run build
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments.

## Features

- ✅ Wallet-based authentication (extension + mobile QR)
- ✅ Product catalog with categories and search
- ✅ Shopping cart with quantity management
- ✅ Blockchain payment via smart contract
- ✅ Transaction status tracking
- ✅ Responsive design with smooth animations
- ✅ Base Sepolia testnet integration

## Tech Stack

- **Frontend:** React + Vite + TypeScript
- **Styling:** TailwindCSS + Framer Motion
- **Web3:** Wagmi + RainbowKit + Viem
- **Blockchain:** Base Sepolia Testnet
- **State:** React Context API + Local Storage
