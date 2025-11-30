import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const OrderStatus = () => {
  const { txHash } = useParams();
  const navigate = useNavigate();

  const explorerUrl = `https://sepolia.basescan.org/tx/${txHash}`;

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-full mb-6">
          <CheckCircle2 className="h-12 w-12 text-white" />
        </div>

        <h1 className="text-4xl font-bold mb-3">Transaction Completed!</h1>
        <p className="text-muted-foreground mb-8">
          Your purchase has been successfully recorded on the blockchain
        </p>

        <div className="bg-card rounded-lg p-6 shadow-lg mb-6 text-left">
          <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium text-green-600">Confirmed</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Network</span>
              <span className="font-medium">Base Sepolia</span>
            </div>
            
            <div className="border-t border-border pt-3">
              <span className="text-muted-foreground block mb-2">Transaction Hash</span>
              <div className="flex items-center gap-2 bg-secondary p-3 rounded-lg break-all">
                <code className="text-xs flex-1">{txHash}</code>
                <a
                  href={explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => navigate('/')}
            className="bg-gradient-primary hover:bg-gradient-hover text-white border-0"
          >
            Continue Shopping
          </Button>
          <Button
            variant="outline"
            onClick={() => window.open(explorerUrl, '_blank')}
          >
            View on BaseScan
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-8 p-4 bg-secondary/30 rounded-lg">
          <p className="text-xs text-muted-foreground">
            Save your transaction hash for your records. You can verify this transaction 
            on the Base Sepolia block explorer at any time.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
