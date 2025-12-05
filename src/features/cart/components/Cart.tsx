
import React from 'react';
import { CartItem } from './CartItem';
import { CartSummary } from './CartSummary';
import { Cart as CartType } from '../../../types/cart';
import { Button } from '../../../components/shared';
import './Cart.css';

interface CartProps {
  cart: CartType | null;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
  onClearCart: () => void;
}

export const Cart: React.FC<CartProps> = ({ 
  cart, 
  onUpdateQuantity, 
  onRemove, 
  onCheckout, 
  onClearCart 
}) => {
  if (!cart || cart.items.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Button variant="primary" onClick={() => window.location.href = '/products'}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-items">
        <h1>Shopping Cart</h1>
        {cart.items.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemove}
          />
        ))}
      </div>

      <div className="cart-sidebar">
        <CartSummary cart={cart} onCheckout={onCheckout} />

        <Button variant="outline" onClick={onClearCart}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
};
