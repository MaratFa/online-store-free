
// Mock data for development and testing
import { Product, User, Cart, Order } from '../types';

// Mock products
export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 99.99,
    discountPrice: 79.99,
    image: '/images/headphones.jpg',
    category: 'Electronics',
    stock: 15,
    rating: 4.5,
    reviews: 128,
    featured: true,
    tags: ['audio', 'wireless', 'noise-cancelling']
  },
  {
    id: 2,
    name: 'Leather Wallet',
    description: 'Genuine leather wallet with multiple card slots',
    price: 49.99,
    image: '/images/wallet.jpg',
    category: 'Accessories',
    stock: 30,
    rating: 4.2,
    reviews: 87,
    featured: false,
    tags: ['leather', 'accessory', 'fashion']
  },
  // Add more mock products as needed
];

// Mock users
export const mockUser: User = {
  id: 1,
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  avatar: '/images/avatar.jpg',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Mock cart
export const mockCart: Cart = {
  id: 1,
  userId: 1,
  items: [
    {
      id: 1,
      productId: 1,
      product: mockProducts[0],
      quantity: 1,
      addedAt: new Date().toISOString()
    }
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Mock orders
export const mockOrders: Order[] = [
  {
    id: 1,
    userId: 1,
    items: [
      {
        id: 1,
        productId: 1,
        productName: 'Wireless Headphones',
        productImage: '/images/headphones.jpg',
        price: 99.99,
        discountPrice: 79.99,
        quantity: 1
      }
    ],
    status: 'delivered',
    subtotal: 99.99,
    tax: 8.00,
    shipping: 5.00,
    discount: 20.00,
    total: 92.99,
    shippingAddress: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      country: 'USA'
    },
    paymentMethod: 'Credit Card',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    shippedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    deliveredAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  }
  // Add more mock orders as needed
];
