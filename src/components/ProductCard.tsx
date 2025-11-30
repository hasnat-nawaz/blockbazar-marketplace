import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
          <div className="aspect-square overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="p-4">
            <div className="text-xs font-medium text-primary mb-2">
              {product.category}
            </div>
            <h3 className="font-semibold text-lg mb-2 text-card-foreground">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-foreground">
                {product.price} ETH
              </span>
              <span className="text-xs text-muted-foreground">
                Base Sepolia
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
