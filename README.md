# Online Store - React Application

A modern, responsive e-commerce platform built with React, TypeScript, and Redux Toolkit. This application showcases a clean design with intuitive user interface and comprehensive shopping functionality, featuring a robust API fallback mechanism for seamless operation even when the backend is unavailable.

## 🚀 Live Demo

View the live application at: [https://your-app-url.vercel.app](https://your-app-url.vercel.app)

## ✨ Features

- 🛍️ **Product Catalog**: Browse products with filtering, sorting, and search functionality
- 🛒 **Shopping Cart**: Add items to cart, adjust quantities, and view order summary with Redux state management
- 🔐 **User Authentication**: Register and login to access personalized features
- 📱 **Responsive Design**: Fully responsive layout that works on all devices
- 🏷️ **Product Categories**: Easy navigation through organized product categories
- 📋 **Product Details**: Detailed product pages with ratings, reviews, and specifications
- 💰 **Discount Pricing**: Clear display of original and discounted prices
- 🎨 **Modern UI**: Beautiful interface with smooth transitions and hover effects
- 🧩 **Component Architecture**: Well-organized, reusable UI components
- 🔄 **API Fallback System**: Automatic fallback to mock data when backend is unavailable
- 🚀 **Development Mode**: Seamless development experience with mock data by default

## 🛠️ Technologies Used

- React 18 with functional components and hooks
- TypeScript for type safety
- React Router for client-side routing
- Redux Toolkit for state management
- Axios for API communication with fallback mechanism
- CSS3 with custom properties for styling
- Font Awesome for icons
- Express.js for production server

## 📁 Project Structure

```
online-store-free/
├── public/                 # Static assets
│   ├── images/            # Product images and assets
│   └── index.html         # Main HTML file
├── src/                   # Source code
│   ├── components/        # Reusable components
│   │   ├── layout/        # Layout components (Header, Footer)
│   │   ├── ui/            # UI components (Button, Input)
│   │   └── product/       # Product-specific components
│   ├── pages/             # Page components
│   │   ├── Home.tsx       # Home page
│   │   ├── Products.tsx   # Products listing page
│   │   ├── ProductDetail.tsx # Product detail page
│   │   ├── Cart.tsx       # Shopping cart page
│   │   ├── Account.tsx    # Account login/registration
│   │   └── Dashboard.tsx  # User dashboard
│   ├── services/          # API services
│   │   ├── api.ts         # Original API implementation
│   │   ├── apiWithFallback.ts # API with fallback to mock data
│   │   └── mockApi.ts     # Mock API implementation
│   ├── store/             # Redux store configuration
│   │   ├── slices/        # Redux slices
│   │   │   ├── cartSlice.ts    # Cart state management
│   │   │   ├── productsSlice.ts # Products state management
│   │   │   └── userSlice.ts    # User state management
│   │   ├── thunks/       # Redux thunks
│   │   │   ├── authThunks.ts   # Authentication actions
│   │   │   ├── cartThunks.ts    # Cart actions
│   │   │   └── productsThunks.ts # Products actions
│   │   ├── hooks.ts      # Custom Redux hooks
│   │   └── index.ts      # Store configuration
│   ├── data.ts            # Product data
│   ├── App.tsx            # Main app component with routing
│   ├── App.css            # App styles
│   ├── index.tsx          # Entry point
│   └── index.css          # Global styles
├── serve.ts               # Production server
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MaratFa/online-store-free.git
   cd online-store-free
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

### Building for Production

To build the application for production:

```bash
npm run build
```

To serve the production build:

```bash
npm run serve
```

This will start the production server on port 3000 (or the port specified in the PORT environment variable).

## 🌐 Deployment

### Deploying to Vercel

The application is configured to be easily deployed to Vercel:

1. **Automatic Deployment**:
   - Connect your GitHub repository to Vercel
   - Push changes to trigger automatic deployments

2. **Manual Deployment**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login and deploy
   vercel login
   vercel --prod
   ```

3. **Environment Variables**:
   - Set `REACT_APP_API_URL` in Vercel dashboard if connecting to a real API
   - Currently configured to use mock data in production

### Important Note

The application currently uses mock data for all environments to ensure smooth operation without a backend API. This prevents connection errors when deployed to platforms like Vercel. If you want to connect to a real backend API, update the `apiWithFallback.ts` file and set the `REACT_APP_API_URL` environment variable.

## 📖 Usage

### Browsing Products

- Navigate to the Products page to view all available items
- Use the search bar to find specific products
- Filter products by category using the category buttons
- Sort products by price or featured status

### Product Information

Each product card displays:
- Product image
- Product name
- Category
- Rating and number of reviews
- Original price (if discounted)
- Discounted price (if applicable)
- "Add to Cart" button

### Shopping Cart

- View your cart by clicking the cart icon in the header
- Adjust quantities using the + and - buttons
- Remove items with the trash icon
- View the order summary with subtotal, tax, and total
- Proceed to checkout when ready

### User Account

- Create an account or log in through the Account page
- Access your dashboard after logging in
- View order history and saved information

### Component Architecture

The application follows a modular component structure:

- **Layout Components**: Header and Footer for consistent page structure
- **UI Components**: Reusable UI elements like Button and Input
- **Product Components**: Product-specific components like ProductCard

All components are organized in their respective directories with index files for clean imports.

## 🔄 API Fallback Mechanism

The application includes a robust API fallback system that ensures smooth operation even when the backend is unavailable:

- **Automatic Detection**: The system automatically detects when the backend is not responding
- **Seamless Transition**: Switches to mock data without user interruption
- **Development Mode**: Uses mock data by default in development for faster development
- **Type Safety**: All mock data is properly typed to match real API responses
- **Consistent Interface**: The same API interface is used regardless of whether real or mock data is being used

### How It Works

1. When the application starts, it tries to connect to the backend API
2. If any request fails (connection refused), the response interceptor:
   - Logs a warning message
   - Switches to mock API mode
   - Returns appropriate mock data based on the request URL and method
3. Once switched to mock mode, all subsequent requests use mock data

## 🎨 Customization

### Adding New Products

To add new products:

1. Open `src/data.ts`
2. Add a new product object to the `products` array with the following structure:
   ```typescript
   {
     id: number,              // Unique identifier
     name: string,            // Product name
     description: string,     // Product description
     price: number,           // Regular price
     discountPrice?: number,  // Optional discounted price
     image: string,           // Image path
     category: string,        // Product category
     stock: number,           // Available stock
     rating: number,          // Average rating (1-5)
     reviews: number          // Number of reviews
   }
   ```

3. Add the product image to the `public/images` directory

### Adding New Categories

To add new product categories:

1. Open `src/data.ts`
2. Add a new category to the `categories` array:
   ```typescript
   export const categories = [
     "All",
     "Electronics",
     "Clothing",
     // Add your new category here
   ];
   ```

### Creating New Components

To add new components:

1. Create a component file in the appropriate directory:
   - Layout components: `src/components/layout/`
   - UI components: `src/components/ui/`
   - Product components: `src/components/product/`

2. Create the component with TypeScript:
   ```typescript
   import React from 'react';
   import './ComponentName.css';

   export const ComponentName: React.FC = () => {
     return (
       <div className="component-name">
         {/* Component content */}
       </div>
     );
   };
   ```

3. Create the corresponding CSS file

4. Export the component in the directory's index.ts file

### Styling

The application uses CSS with custom properties for consistent theming:

- Primary colors are defined in `index.css`
- Component-specific styles are in separate CSS files
- Responsive design uses media queries

### Adding New Pages

To add new pages:

1. Create a new component in `src/pages/`
2. Add a route in `App.tsx`
3. Add navigation links in `Header.tsx` if needed

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Guidelines

- Follow the existing code style and conventions
- Use TypeScript for all new code
- Ensure components are properly typed
- Write responsive CSS
- Test your changes before submitting

### Code Structure

- Use functional components with hooks
- Keep components focused on a single responsibility
- Use proper TypeScript typing for all props and state
- Follow the established directory structure

## 📄 License

This project is licensed under the MIT License.

## 🔮 Future Enhancements

Potential improvements for future versions:

- Real-time inventory management
- Advanced search with filters
- Customer reviews system
- Wishlist functionality
- Order tracking
- Payment gateway integration
- Product comparison feature
- Social login integration
- Multi-language support
- Advanced analytics dashboard
- Automated testing suite

## 🐛 Recent Fixes

- Fixed API connection issues by implementing mock data fallback for production
- Resolved circular import issues in routes configuration
- Improved deployment compatibility with platforms like Vercel
