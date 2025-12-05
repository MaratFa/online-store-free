
import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../../../types/product';
import { Pagination } from '../../../components/shared';
import './ProductGrid.css';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onAddToCart: (productId: number) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
  onAddToCart
}) => {
  if (isLoading) {
    return (
      <div className="product-grid-loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="no-products">
        <h2>No products found</h2>
        <p>Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      <div className="product-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};
