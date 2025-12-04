import { products } from '../data';

// Type definitions
interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
  token: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

// Mock API responses
export const mockApi = {
  // Get all products
  getProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(products);
      }, 500); // Simulate network delay
    });
  },

  // Get product by ID
  getProductById: (id: number) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = products.find(p => p.id === id);
        if (product) {
          resolve(product);
        } else {
          reject(new Error('Product not found'));
        }
      }, 500);
    });
  },

  // Get products by category
  getProductsByCategory: (category: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (category === 'All') {
          resolve(products);
        } else {
          resolve(products.filter(p => p.category === category));
        }
      }, 500);
    });
  },

  // Search products
  searchProducts: (query: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = products.filter(p => 
          p.name.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filtered);
      }, 500);
    });
  },

  // Cart operations (mock)
  getCart: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          items: [],
          totalAmount: 0,
          totalItems: 0
        });
      }, 500);
    });
  },

  addToCart: (productId: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          items: [],
          totalAmount: 0,
          totalItems: 0
        });
      }, 500);
    });
  },

  // User operations (mock)
  login: (email: string, password: string): Promise<AuthResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'user@example.com' && password === 'password') {
          resolve({
            user: {
              id: '1',
              email: 'user@example.com',
              name: 'Test User'
            },
            token: 'mock-jwt-token'
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  },

  register: (userData: { name: string; email: string; password: string }): Promise<AuthResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            email: userData.email,
            name: userData.name
          },
          token: 'mock-jwt-token'
        });
      }, 500);
    });
  },
  
  getCurrentUser: (): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: '1',
          email: 'user@example.com',
          name: 'Test User'
        });
      }, 500);
    });
  },
  
  // Cart operations (mock)
  updateCartItem: (itemId: string, quantity: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          items: [],
          totalAmount: 0,
          totalItems: 0
        });
      }, 500);
    });
  },
  
  removeFromCart: (itemId: string) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          items: [],
          totalAmount: 0,
          totalItems: 0
        });
      }, 500);
    });
  },
  
  clearCart: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          items: [],
          totalAmount: 0,
          totalItems: 0
        });
      }, 500);
    });
  }
};
