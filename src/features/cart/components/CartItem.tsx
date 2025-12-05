
import React from 'react';
import { Button } from '../../../components/shared';
import { CartItem as CartItemType } from '../../../types/cart';
import './CartItem.css';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.product.image} alt={item.product.name} />
      </div>

      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.product.name}</h3>
        <p className="cart-item-price">
          ${item.product.discountPrice || item.product.price}
        </p>
      </div>

      <div className="cart-item-quantity">
        <div className="quantity-controls">
          <button onClick={handleDecrement} className="quantity-btn">-</button>
          <span className="quantity-value">{item.quantity}</span>
          <button onClick={handleIncrement} className="quantity-btn">+</button>
        </div>
      </div>

      <div className="cart-item-total">
        ${(item.product.discountPrice || item.product.price) * item.quantity}
      </div>

      <Button variant="outline" onClick={handleRemove} className="remove-btn">
        Remove
      </Button>
    </div>
  );
};
