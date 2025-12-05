
// Data transformation utilities
import { Product, User, Cart, Order } from '../types';

// Map API response to Product
export const mapToProduct = (data: any): Product => {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    price: data.price,
    discountPrice: data.discountPrice,
    image: data.image,
    category: data.category,
    stock: data.stock,
    rating: data.rating,
    reviews: data.reviews,
    featured: data.featured,
    tags: data.tags
  };
};

// Map API response to User
export const mapToUser = (data: any): User => {
  return {
    id: data.id,
    email: data.email,
    firstName: data.firstName || data.name?.split(' ')[0] || '',
    lastName: data.lastName || data.name?.split(' ')[1] || '',
    avatar: data.avatar,
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: data.updatedAt || new Date().toISOString()
  };
};

// Map API response to Cart
export const mapToCart = (data: any): Cart => {
  return {
    id: data.id,
    userId: data.userId,
    items: data.items.map((item: any) => ({
      id: item.id,
      productId: item.productId,
      product: mapToProduct(item.product),
      quantity: item.quantity,
      addedAt: item.addedAt
    })),
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  };
};

// Map API response to Order
export const mapToOrder = (data: any): Order => {
  return {
    id: data.id,
    userId: data.userId,
    items: data.items.map((item: any) => ({
      id: item.id,
      productId: item.productId,
      productName: item.productName,
      productImage: item.productImage,
      price: item.price,
      discountPrice: item.discountPrice,
      quantity: item.quantity
    })),
    status: data.status,
    subtotal: data.subtotal,
    tax: data.tax,
    shipping: data.shipping,
    discount: data.discount,
    total: data.total,
    shippingAddress: data.shippingAddress,
    paymentMethod: data.paymentMethod,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    shippedAt: data.shippedAt,
    deliveredAt: data.deliveredAt
  };
};
