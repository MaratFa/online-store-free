# Modern Shop Template

A modern, responsive e-commerce template built with HTML, CSS, and JavaScript.

## Features

- Responsive design that works on all devices
- Product catalog with filtering and search
- Shopping cart functionality
- User account management
- Modern UI with smooth animations
- Clean, maintainable code structure

## Project Structure

```
shop-template/
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   ├── app.js             # Main application logic
│   └── products.js        # Product data and functions
├── images/                # Product and UI images
├── account.html           # User account page
├── index.html             # Homepage
└── README.md              # This file
```

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start exploring the shop template

## Customization

### Adding Products

To add new products:

1. Open `js/products.js`
2. Add your product data to the products array following the existing format:
   ```javascript
   {
     id: "unique-product-id",
     name: "Product Name",
     description: "Product description",
     price: 99.99,
     discountPrice: 79.99,  // Optional
     image: "images/product-image.jpg",
     category: "Category Name",
     stock: 10,
     rating: 4.5
   }
   ```

3. Add the product image to the `images/` folder

### Customizing Styles

All styles are in `css/style.css`. The CSS is organized with clear comments for easy customization.

### Changing Colors

The main brand color is `#4a6de5`. You can change this color throughout the site by updating the CSS variables at the top of `style.css`.

## Browser Support

This template supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE).
