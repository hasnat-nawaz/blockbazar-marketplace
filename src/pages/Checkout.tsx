import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { Loader2, AlertCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/lib/contract';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { isConnected } = useAccount();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  // Use useWriteContract to properly call the contract function
  const { 
    writeContract, 
    data: hash, 
    isPending, 
    error: writeError,
    reset 
  } = useWriteContract();
  
  // Wait for transaction receipt - only enabled when we have a hash
  const { 
    isLoading: isTransactionPending, 
    isSuccess: isConfirmed,
    isError: isTransactionError,
    error: receiptError
  } = useWaitForTransactionReceipt({
    hash: hash || undefined,
    query: {
      enabled: !!hash,
      retry: 3,
    },
  });

  // Handle write errors
  useEffect(() => {
    if (writeError) {
      let errorMessage = 'Transaction failed';
      const errorStr = String(writeError);
      
      if (errorStr.includes('rejected') || 
          errorStr.includes('denied') ||
          errorStr.includes('User rejected') ||
          writeError.message?.includes('rejected') ||
          writeError.message?.includes('denied')) {
        errorMessage = 'Transaction was rejected in your wallet.';
      } else if (errorStr.includes('insufficient funds') || 
                 writeError.message?.includes('insufficient funds')) {
        errorMessage = 'Insufficient funds for this transaction.';
      } else if (writeError.message) {
        errorMessage = writeError.message;
      }
      
      setError(errorMessage);
      console.error('Write contract error:', writeError);
    }
  }, [writeError]);

  // Handle receipt errors
  useEffect(() => {
    if (isTransactionError && receiptError) {
      setError('Transaction was reverted on the blockchain. Please try again.');
      console.error('Transaction receipt error:', receiptError);
    }
  }, [isTransactionError, receiptError]);

  // Navigate to success page only when transaction is confirmed
  useEffect(() => {
    if (isConfirmed && hash) {
      clearCart();
      navigate(`/order-status/${hash}`);
    }
  }, [isConfirmed, hash, clearCart, navigate]);

  // Clear error when starting new transaction
  useEffect(() => {
    if (isPending) {
      setError(null);
    }
  }, [isPending]);

  const isContractConfigured = CONTRACT_ADDRESS && CONTRACT_ADDRESS !== '0x0000000000000000000000000000000000000000';

  const handlePurchase = async () => {
    if (!isConnected) return;
    
    if (!isContractConfigured) {
      alert('Smart contract address is not configured.');
      return;
    }

    setError(null);

    try {
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI as any,
        functionName: 'purchase',
        args: [], // <--- CHANGED: Leave this empty!
        value: parseEther(totalPrice), // The money goes here, not in args
        gas: BigInt(300000), // Optional: Keep this safety buffer we discussed
      } as any);
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to send transaction';
      setError(errorMessage);
      console.error('Transaction failed:', error);
    }
  };

  const handleReset = () => {
    reset();
    setError(null);
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button onClick={() => navigate('/')}>Browse Products</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="bg-card rounded-lg p-6 shadow-lg mb-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span className="font-medium">
                  {(parseFloat(item.price) * item.quantity).toFixed(4)} ETH
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              {totalPrice} ETH
            </span>
          </div>
        </div>

        {!isConnected ? (
          <div className="bg-secondary/50 rounded-lg p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Connect Your Wallet</h3>
            <p className="text-muted-foreground mb-6">
              Connect your wallet to complete the purchase
            </p>
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          </div>
        ) : !isContractConfigured ? (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2 text-yellow-600 dark:text-yellow-400">
              Smart Contract Not Configured
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Please deploy the smart contract and add the address to your .env file.
            </p>
            <p className="text-xs text-muted-foreground">
              See SETUP.md for deployment instructions using Remix IDE.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Show error message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">
                      {error}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                      className="w-full"
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Show transaction status while waiting for confirmation */}
            {hash && !isConfirmed && !error && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-blue-600 dark:text-blue-400" />
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
                  Processing Transaction...
                </p>
                <p className="text-xs text-muted-foreground">
                  Waiting for blockchain confirmation. This may take a few moments.
                </p>
                <a
                  href={`https://sepolia.basescan.org/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
                >
                  View on BaseScan
                </a>
              </div>
            )}

            <Button
              onClick={handlePurchase}
              disabled={isPending || isTransactionPending || (!!hash && !isConfirmed && !error)}
              className="w-full bg-gradient-primary hover:bg-gradient-hover text-white border-0 disabled:opacity-50"
              size="lg"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Confirm in Wallet...
                </>
              ) : isTransactionPending || (hash && !isConfirmed && !error) ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing Transaction...
                </>
              ) : (
                `Pay ${totalPrice} ETH`
              )}
            </Button>
            {!hash && !isPending && !error && (
              <p className="text-xs text-muted-foreground text-center">
                You'll be prompted to sign the transaction in your wallet
              </p>
            )}
          </div>
        )}

        <div className="mt-6 p-4 bg-secondary/30 rounded-lg">
          <h3 className="font-semibold mb-2 text-sm">Secure Payment</h3>
          <p className="text-xs text-muted-foreground">
            Your payment is secured by a smart contract on Base Sepolia testnet. 
            Only you can authorize this transaction.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
