
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { ProductGrid } from '../components';
import { ProductFilter } from '../components';
import { RootState } from '../../../store';
import { fetchProducts, addToCart } from '../../../store/thunks';
import { ProductFilter as ProductFilterType } from '../../../types/product';
import { useSearchParams } from 'react-router-dom';
import './ProductsPage.css';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  // Get filter state from URL params
  const category = searchParams.get('category') || '';
  const minPrice = Number(searchParams.get('minPrice')) || 0;
  const maxPrice = Number(searchParams.get('maxPrice')) || 0;
  const rating = Number(searchParams.get('rating')) || 0;
  const inStock = searchParams.get('inStock') === 'true';
  const featured = searchParams.get('featured') === 'true';
  const page = Number(searchParams.get('page')) || 1;

  // Get products and pagination state from Redux
  const { filteredProducts: products, loading } = useAppSelector(
    (state) => state.products
  );
  const totalPages = 1;
  const currentPage = 1;

  const [filter, setFilter] = useState<ProductFilterType>({
    category,
    minPrice,
    maxPrice,
    rating,
    inStock,
    featured
  });

  // Update URL params when filter changes
  useEffect(() => {
    const params = new URLSearchParams();

    if (filter.category) params.set('category', filter.category);
    else params.delete('category');

    if (filter.minPrice && filter.minPrice > 0) params.set('minPrice', filter.minPrice.toString());
    else params.delete('minPrice');

    if (filter.maxPrice && filter.maxPrice > 0) params.set('maxPrice', filter.maxPrice.toString());
    else params.delete('maxPrice');

    if (filter.rating && filter.rating > 0) params.set('rating', filter.rating.toString());
    else params.delete('rating');

    if (filter.inStock) params.set('inStock', 'true');
    else params.delete('inStock');

    if (filter.featured) params.set('featured', 'true');
    else params.delete('featured');

    params.set('page', page.toString());

    setSearchParams(params);
  }, [filter, page, setSearchParams]);

  // Fetch products on mount and when filter or page changes
  useEffect(() => {
    dispatch(fetchProducts({ 
      filter, 
      page 
    }));
  }, [dispatch, filter, page]);

  const handleFilterChange = (newFilter: ProductFilterType) => {
    setFilter(newFilter);
  };

  const handlePageChange = (newPage: number) => {
    // Update page in URL which will trigger the fetch
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    setSearchParams(params);
  };

  const handleAddToCart = (productId: number) => {
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Products</h1>
        <ProductFilter filter={filter} onChange={handleFilterChange} />
      </div>

      <ProductGrid
        products={products}
        isLoading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};
