// Sample product data
const products = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    description:
      "High-quality wireless headphones with noise cancellation and superior sound quality. Perfect for music lovers and professionals.",
    price: 199.99,
    discountPrice: 149.99,
    image: "images/headphones.jpg",
    category: "Electronics",
    stock: 15,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Leather Laptop Bag",
    description:
      "Stylish and durable leather laptop bag designed for professionals. Fits laptops up to 15 inches with additional compartments.",
    price: 89.99,
    image: "images/laptop-bag",
    category: "Accessories",
    stock: 25,
    rating: 4.2,
  },
  {
    id: 3,
    name: "Smart Watch Pro",
    description:
      "Advanced smartwatch with health monitoring, GPS tracking, and smartphone integration. Water-resistant design.",
    price: 299.99,
    discountPrice: 249.99,
    image: "images/smartwatch",
    category: "Electronics",
    stock: 10,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Organic Cotton T-Shirt",
    description:
      "Comfortable and sustainable organic cotton t-shirt available in multiple colors. Ethically made and eco-friendly.",
    price: 29.99,
    image: "images/tshirt",
    category: "Clothing",
    stock: 50,
    rating: 4.0,
  },
  {
    id: 5,
    name: "Stainless Steel Water Bottle",
    description:
      "Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.",
    price: 24.99,
    image: "images/water-bottle",
    category: "Accessories",
    stock: 100,
    rating: 4.6,
  },
  {
    id: 6,
    name: "Wireless Charging Pad",
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator.",
    price: 39.99,
    image: "images/charger",
    category: "Electronics",
    stock: 30,
    rating: 4.3,
  },
  {
    id: 7,
    name: "Professional Camera Lens",
    description:
      "High-quality camera lens for professional photography. Wide aperture and excellent low-light performance.",
    price: 899.99,
    discountPrice: 799.99,
    image: "images/camera-lens",
    category: "Electronics",
    stock: 5,
    rating: 4.8,
  },
  {
    id: 8,
    name: "Ergonomic Office Chair",
    description:
      "Comfortable ergonomic office chair with lumbar support and adjustable height. Perfect for long work sessions.",
    price: 249.99,
    discountPrice: 199.99,
    image: "images/office-chair",
    category: "Furniture",
    stock: 12,
    rating: 4.4,
  },
];

// Sample category data
const categories = [
  {
    id: 1,
    name: "Electronics",
    icon: "fas fa-laptop",
  },
  {
    id: 2,
    name: "Clothing",
    icon: "fas fa-tshirt",
  },
  {
    id: 3,
    name: "Accessories",
    icon: "fas fa-glasses",
  },
  {
    id: 4,
    name: "Furniture",
    icon: "fas fa-couch",
  },
  {
    id: 5,
    name: "Home & Garden",
    icon: "fas fa-home",
  },
  {
    id: 6,
    name: "Sports",
    icon: "fas fa-running",
  },
];

// Shopping cart
let cart = [];

// DOM elements
const productGrid = document.getElementById("product-grid");
const categoryGrid = document.getElementById("category-grid");
const productModal = document.getElementById("product-modal");
const cartModal = document.getElementById("cart-modal");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Initialize the app
document.addEventListener("DOMContentLoaded", function () {
  renderProducts();
  renderCategories();
  setupEventListeners();
  updateCartCount();
});

// Render products
function renderProducts(productsToRender = products) {
  productGrid.innerHTML = "";

  productsToRender.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";

    const priceHTML = product.discountPrice
      ? `<span class="price">$${product.discountPrice}</span>
               <span class="discount">$${product.price}</span>`
      : `<span class="price">$${product.price}</span>`;

    productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    ${priceHTML}
                </div>
                <div class="product-actions">
                    <button class="view-details" data-id="${product.id}">View Details</button>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;

    productGrid.appendChild(productCard);
  });

  // Add event listeners to buttons
  document.querySelectorAll(".view-details").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = parseInt(this.getAttribute("data-id"));
      showProductDetails(productId);
    });
  });

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", function () {
      const productId = parseInt(this.getAttribute("data-id"));
      addToCart(productId, 1);
    });
  });
}

// Render categories
function renderCategories() {
  categoryGrid.innerHTML = "";

  categories.forEach((category) => {
    const categoryCard = document.createElement("div");
    categoryCard.className = "category-card";
    categoryCard.innerHTML = `
            <div class="category-icon">
                <i class="${category.icon}"></i>
            </div>
            <h3 class="category-name">${category.name}</h3>
        `;

    categoryGrid.appendChild(categoryCard);
  });
}

// Setup event listeners
function setupEventListeners() {
  // Close modals
  document.querySelectorAll(".close-btn").forEach((button) => {
    button.addEventListener("click", function () {
      this.closest(".modal").style.display = "none";
    });
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === productModal) {
      productModal.style.display = "none";
    }
    if (event.target === cartModal) {
      cartModal.style.display = "none";
    }
  });

  // Cart icon
  document.querySelector(".cart-icon").addEventListener("click", function () {
    showCart();
  });

  // Newsletter form
  document
    .getElementById("newsletter-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      alert(`Thank you for subscribing with email: ${email}`);
      this.reset();
    });

  // Search functionality
  document.getElementById("search-btn").addEventListener("click", function () {
    const searchTerm = document
      .getElementById("search-input")
      .value.toLowerCase();
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    renderProducts(filteredProducts);
  });

  document
    .getElementById("search-input")
    .addEventListener("keyup", function (e) {
      if (e.key === "Enter") {
        document.getElementById("search-btn").click();
      }
    });

  // Quantity selectors in product modal
  document
    .getElementById("decrease-quantity")
    .addEventListener("click", function () {
      const quantityInput = document.getElementById("quantity");
      if (quantityInput.value > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
      }
    });

  document
    .getElementById("increase-quantity")
    .addEventListener("click", function () {
      const quantityInput = document.getElementById("quantity");
      quantityInput.value = parseInt(quantityInput.value) + 1;
    });

  // Add to cart button in product modal
  document
    .getElementById("add-to-cart-btn")
    .addEventListener("click", function () {
      const productId = parseInt(this.getAttribute("data-product-id"));
      const quantity = parseInt(document.getElementById("quantity").value);
      addToCart(productId, quantity);
      productModal.style.display = "none";
    });

  // Checkout button
  document
    .getElementById("checkout-btn")
    .addEventListener("click", function () {
      if (cart.length === 0) {
        alert("Your cart is empty. Please add some products before checkout.");
        return;
      }
      alert(
        "Checkout functionality would be implemented here. This is a demo application."
      );
    });
}

// Show product details in modal
function showProductDetails(productId) {
  const product = products.find((p) => p.id === productId);

  if (!product) return;

  const priceHTML = product.discountPrice
    ? `<span id="modal-product-price">$${product.discountPrice}</span>
           <span id="modal-product-discount" class="discount">$${product.price}</span>`
    : `<span id="modal-product-price">$${product.price}</span>`;

  document.getElementById("modal-product-image").src = product.image;
  document.getElementById("modal-product-image").alt = product.name;
  document.getElementById("modal-product-title").textContent = product.name;
  document.getElementById("modal-product-description").textContent =
    product.description;
  document.getElementById("modal-product-price").parentElement.innerHTML =
    priceHTML;
  document.getElementById("quantity").value = 1;
  document
    .getElementById("add-to-cart-btn")
    .setAttribute("data-product-id", productId);

  productModal.style.display = "block";
}

// Add product to cart
function addToCart(productId, quantity) {
  const product = products.find((p) => p.id === productId);

  if (!product) return;

  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      ...product,
      quantity: quantity,
    });
  }

  updateCartCount();
  alert(`${product.name} has been added to your cart.`);
}

// Update cart count
function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = count;
}

// Show cart modal
function showCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cartItems.innerHTML = "";

    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";

      const price = item.discountPrice || item.price;
      const subtotal = (price * item.quantity).toFixed(2);

      cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">$${price}</p>
                    <div class="cart-item-quantity">
                        <button class="decrease-quantity" data-id="${item.id}">-</button>
                        <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
                        <button class="increase-quantity" data-id="${item.id}">+</button>
                    </div>
                    <p class="cart-item-remove" data-id="${item.id}">Remove</p>
                </div>
            `;

      cartItems.appendChild(cartItem);
    });

    // Add event listeners to cart item buttons
    document.querySelectorAll(".decrease-quantity").forEach((button) => {
      button.addEventListener("click", function () {
        const itemId = parseInt(this.getAttribute("data-id"));
        updateCartItemQuantity(itemId, -1);
      });
    });

    document.querySelectorAll(".increase-quantity").forEach((button) => {
      button.addEventListener("click", function () {
        const itemId = parseInt(this.getAttribute("data-id"));
        updateCartItemQuantity(itemId, 1);
      });
    });

    document.querySelectorAll(".quantity-input").forEach((input) => {
      input.addEventListener("change", function () {
        const itemId = parseInt(this.getAttribute("data-id"));
        const newQuantity = parseInt(this.value);
        if (newQuantity > 0) {
          setCartItemQuantity(itemId, newQuantity);
        } else {
          this.value = 1;
        }
      });
    });

    document.querySelectorAll(".cart-item-remove").forEach((button) => {
      button.addEventListener("click", function () {
        const itemId = parseInt(this.getAttribute("data-id"));
        removeFromCart(itemId);
      });
    });
  }

  updateCartTotal();
  cartModal.style.display = "block";
}

// Update cart item quantity
function updateCartItemQuantity(itemId, change) {
  const item = cart.find((item) => item.id === itemId);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeFromCart(itemId);
  } else {
    updateCartCount();
    showCart(); // Refresh the cart modal
  }
}

// Set cart item quantity
function setCartItemQuantity(itemId, quantity) {
  const item = cart.find((item) => item.id === itemId);

  if (!item) return;

  item.quantity = quantity;
  updateCartCount();
  showCart(); // Refresh the cart modal
}

// Remove item from cart
function removeFromCart(itemId) {
  cart = cart.filter((item) => item.id !== itemId);
  updateCartCount();
  showCart(); // Refresh the cart modal
}

// Update cart total
function updateCartTotal() {
  const total = cart.reduce((sum, item) => {
    const price = item.discountPrice || item.price;
    return sum + price * item.quantity;
  }, 0);

  cartTotal.textContent = `$${total.toFixed(2)}`;
}
