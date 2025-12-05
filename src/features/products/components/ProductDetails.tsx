
import React, { useState } from 'react';
import { Button } from '../../../components/shared';
import { Product } from '../../../types/product';
import './ProductDetails.css';

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (productId: number, quantity: number) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
  };

  const handleImageChange = (index: number) => {
    setSelectedImage(index);
  };

  return (
    <div className="product-details">
      <div className="product-images">
        <div className="main-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="image-thumbnails">
          {product.images && product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${product.name} ${index + 1}`}
              className={selectedImage === index ? 'active' : ''}
              onClick={() => handleImageChange(index)}
            />
          ))}
        </div>
      </div>

      <div className="product-info">
        <h1 className="product-name">{product.name}</h1>

        <div className="product-price">
          {product.discountPrice ? (
            <>
              <span className="discount-price">${product.discountPrice}</span>
              <span className="original-price">${product.price}</span>
              <span className="discount-badge">
                {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
              </span>
            </>
          ) : (
            `$${product.price}`
          )}
        </div>

        <div className="product-description">
          {product.description}
        </div>

        <div className="product-meta">
          <div className="product-rating">
            <span className="stars">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </span>
            <span className="rating-count">({product.reviews})</span>
          </div>

          <div className="product-stock">
            {product.stock > 0 ? (
              <span className="in-stock">In Stock ({product.stock} available)</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>
        </div>

        <div className="product-actions">
          <div className="quantity-selector">
            <button onClick={handleDecrement} className="quantity-btn">-</button>
            <span className="quantity-value">{quantity}</span>
            <button onClick={handleIncrement} className="quantity-btn">+</button>
          </div>

          <Button
            variant="primary"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="add-to-cart-btn"
          >
            Add to Cart
          </Button>
        </div>

        <div className="product-tags">
          {product.tags && product.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
