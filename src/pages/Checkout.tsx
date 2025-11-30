import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { Loader2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { CONTRACT_ADDRESS } from '@/lib/contract';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { isConnected } = useAccount();
  const navigate = useNavigate();

  const { sendTransaction, data: hash, isPending } = useSendTransaction();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess && hash) {
      clearCart();
      navigate(`/order-status/${hash}`);
    }
  }, [isSuccess, hash, clearCart, navigate]);

  const handlePurchase = () => {
    if (!isConnected) return;

    try {
      sendTransaction({
        to: CONTRACT_ADDRESS as `0x${string}`,
        value: parseEther(totalPrice),
      });
    } catch (error) {
      console.error('Transaction failed:', error);
    }
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
        ) : (
          <div className="space-y-4">
            <Button
              onClick={handlePurchase}
              disabled={isPending || isConfirming}
              className="w-full bg-gradient-primary hover:bg-gradient-hover text-white border-0"
              size="lg"
            >
              {isPending || isConfirming ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {isPending ? 'Confirm in Wallet...' : 'Processing Transaction...'}
                </>
              ) : (
                `Pay ${totalPrice} ETH`
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              You'll be prompted to sign the transaction in your wallet
            </p>
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
