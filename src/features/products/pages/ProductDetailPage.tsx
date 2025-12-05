
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { ProductDetails } from '../components';
import { RootState } from '../../../store';
import { fetchProductById, addToCart } from '../../../store/thunks';
import { useParams } from 'react-router-dom';
import './ProductDetailPage.css';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { currentProduct: product, loading } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
  }, [dispatch, id]);

  const handleAddToCart = (productId: number, quantity: number) => {
    dispatch(addToCart({ productId, quantity }));
  };

  if (loading || !product) {
    return (
      <div className="product-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <ProductDetails
        product={product}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};
