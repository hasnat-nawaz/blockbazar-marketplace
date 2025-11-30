import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { products } from '@/lib/products';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate('/')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 gap-8"
      >
        <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <div className="inline-block self-start px-3 py-1 bg-gradient-primary text-white text-sm font-medium rounded-full mb-4">
            {product.category}
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          
          <p className="text-muted-foreground text-lg mb-6">
            {product.description}
          </p>

          <div className="flex items-baseline gap-2 mb-8">
            <span className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {product.price} ETH
            </span>
            <span className="text-muted-foreground">on Base Sepolia</span>
          </div>

          <Button
            size="lg"
            onClick={handleAddToCart}
            className="bg-gradient-primary hover:bg-gradient-hover text-white border-0 w-full md:w-auto"
          >
            Add to Cart
          </Button>

          <div className="mt-8 p-4 bg-secondary/50 rounded-lg">
            <h3 className="font-semibold mb-2">Secure Blockchain Payment</h3>
            <p className="text-sm text-muted-foreground">
              All purchases are secured by smart contracts on Base Sepolia testnet
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
