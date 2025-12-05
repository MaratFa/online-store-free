
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
  featured?: boolean;
  tags?: string[];
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  featured?: boolean;
  search?: string;
}

export interface ProductSort {
  field: 'price' | 'rating' | 'name' | 'reviews';
  direction: 'asc' | 'desc';
}
