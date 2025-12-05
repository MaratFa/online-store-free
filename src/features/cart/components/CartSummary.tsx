
import React from 'react';
import { Button } from '../../../components/shared';
import { Cart } from '../../../types/cart';
import './CartSummary.css';

interface CartSummaryProps {
  cart: Cart;
  onCheckout: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ cart, onCheckout }) => {
  const subtotal = cart.items.reduce(
    (sum, item) => sum + (item.product.discountPrice || item.product.price) * item.quantity,
    0
  );

  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="cart-summary">
      <h2 className="summary-title">Order Summary</h2>

      <div className="summary-row">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      <div className="summary-row">
        <span>Shipping</span>
        <span>
          {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
        </span>
      </div>

      <div className="summary-row">
        <span>Tax</span>
        <span>${tax.toFixed(2)}</span>
      </div>

      <div className="summary-divider"></div>

      <div className="summary-row total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <div className="summary-note">
        {shipping > 0 && (
          <p>Add ${(100 - subtotal).toFixed(2)} more for free shipping</p>
        )}
      </div>

      <Button variant="primary" onClick={onCheckout} className="checkout-btn">
        Proceed to Checkout
      </Button>
    </div>
  );
};
