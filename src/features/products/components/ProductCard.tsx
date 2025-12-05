
import React from 'react';
import { Button } from '../../../components/shared';
import { Product } from '../../../types/product';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart(product.id);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {product.discountPrice && (
          <span className="discount-badge">
            {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
          </span>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">
          {product.discountPrice ? (
            <>
              <span className="discount-price">${product.discountPrice}</span>
              <span className="original-price">${product.price}</span>
            </>
          ) : (
            `$${product.price}`
          )}
        </p>
      </div>

      <Button 
        variant="primary" 
        onClick={handleAddToCart} 
        className="add-to-cart-btn"
      >
        Add to Cart
      </Button>
    </div>
  );
};
