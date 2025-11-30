# Online Store - React Application

A modern, responsive online store built with React, TypeScript, and CSS.

## Features

- Product catalog with filtering and search functionality
- Responsive design that works on all devices
- Product categories for easy navigation
- Product ratings and reviews
- Discount pricing display
- Modern UI with hover effects and transitions

## Technologies Used

- React 18
- TypeScript
- CSS3 with custom properties
- Font Awesome for icons

## Project Structure

```
online-store-free/
├── public/                 # Static assets
│   ├── images/            # Product images
│   └── index.html         # Main HTML file
├── src/                   # Source code
│   ├── components/        # Reusable components
│   │   ├── Header.tsx
│   │   └── Header.css
│   ├── data.ts            # Product data
│   ├── pages/             # Page components
│   │   ├── Account.tsx
│   │   ├── Home.tsx
│   │   └── Products.tsx
│   ├── App.tsx            # Main app component
│   ├── App.css            # App styles
│   ├── index.tsx          # Entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/online-store-free.git
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

## Usage

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

## Customization

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
2. Add the new category to the `categories` array:
   ```typescript
   export const categories = [
     "All",
     "Electronics",
     "Clothing",
     // Add your new category here
   ];
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
