import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export const Header = () => {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          BlockBazar
        </Link>
        
        <div className="text-sm font-medium text-muted-foreground">
          Powered by Base Chain
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-foreground hover:text-primary transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};
