
// Data transformation utilities
import { Product } from '../types';

// Transform product for display
export const transformProduct = (product: Product) => {
  return {
    ...product,
    // Calculate discount percentage if discount price exists
    discountPercentage: product.discountPrice 
      ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
      : 0,
    // Format price with currency
    formattedPrice: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(product.discountPrice || product.price)
  };
};

// Transform array of products for display
export const transformProducts = (products: Product[]) => {
  return products.map(transformProduct);
};

// Transform search results to highlight matching text
export const transformSearchResults = (products: Product[], query: string) => {
  if (!query) return products;

  const lowerQuery = query.toLowerCase();

  return products.map(product => ({
    ...product,
    // Highlight matching parts of the product name
    highlightedName: product.name.replace(
      new RegExp(`(${lowerQuery})`, 'gi'),
      match => `<mark>${match}</mark>`
    )
  }));
};
