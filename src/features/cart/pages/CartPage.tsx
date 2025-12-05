
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { Cart } from '../components';
import { RootState } from '../../../store';
import { fetchCart, updateCartItem, removeFromCart, clearCart } from '../../../store/thunks';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

export const CartPage: React.FC = () => {
  const { items, totalAmount, totalItems, loading } = useAppSelector((state) => state.cart);
  
  // Create a cart object for compatibility
  const cart = items.length > 0 ? {
    id: 1,
    userId: 1,
    items: items.map(item => ({
      ...item,
      productId: item.id,
      product: {
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        discountPrice: item.discountPrice,
      },
      addedAt: new Date().toISOString(),
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } : null;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateCartItem({ itemId: id.toString(), quantity }));
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id.toString()));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (loading) {
    return <div className="loading">Loading cart...</div>;
  }

  return (
    <div className="cart-page-container">
      <Cart
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
        onCheckout={handleCheckout}
        onClearCart={handleClearCart}
      />
    </div>
  );
};
