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
    reviews: 128,
  },
  {
    id: 2,
    name: "Leather Laptop Bag",
    description:
      "Stylish and durable leather laptop bag designed for professionals. Fits laptops up to 15 inches with additional compartments.",
    price: 89.99,
    image: "images/laptop-bag.jpg",
    category: "Accessories",
    stock: 25,
    rating: 4.2,
    reviews: 67,
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
    reviews: 203,
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
    reviews: 45,
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
    reviews: 89,
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
    reviews: 56,
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
    reviews: 34,
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
    reviews: 78,
  },
  {
    id: 9,
    name: "Designer Sunglasses",
    description:
      "Stylish designer sunglasses with UV protection and polarized lenses. Available in various frame styles.",
    price: 149.99,
    discountPrice: 99.99,
    image: "images/sunglasses",
    category: "Accessories",
    stock: 40,
    rating: 4.1,
    reviews: 92,
  },
  {
    id: 10,
    name: "Denim Jacket",
    description:
      "Classic denim jacket with modern fit and premium quality denim. Versatile piece for any wardrobe.",
    price: 79.99,
    image: "images/denim-jacket",
    category: "Clothing",
    stock: 35,
    rating: 4.5,
    reviews: 103,
  },
  {
    id: 11,
    name: "Smart Home Hub",
    description:
      "Central control for all your smart home devices. Compatible with major smart home brands.",
    price: 129.99,
    image: "images/smart-hub",
    category: "Electronics",
    stock: 20,
    rating: 4.2,
    reviews: 61,
  },
  {
    id: 12,
    name: "Minimalist Backpack",
    description:
      "Sleek and functional backpack with laptop compartment and multiple pockets. Water-resistant material.",
    price: 59.99,
    image: "images/backpack",
    category: "Accessories",
    stock: 45,
    rating: 4.6,
    reviews: 87,
  },
  {
    id: 13,
    name: "Yoga Mat",
    description:
      "Premium non-slip yoga mat with extra cushioning. Eco-friendly materials and easy to clean.",
    price: 34.99,
    image: "images/yoga-mat",
    category: "Sports",
    stock: 60,
    rating: 4.7,
    reviews: 145,
  },
  {
    id: 14,
    name: "Coffee Maker",
    description:
      "Programmable coffee maker with thermal carafe. Brews up to 12 cups with customizable strength.",
    price: 89.99,
    discountPrice: 69.99,
    image: "images/coffee-maker",
    category: "Home & Garden",
    stock: 25,
    rating: 4.3,
    reviews: 112,
  },
  {
    id: 15,
    name: "Standing Desk",
    description:
      "Adjustable height standing desk with memory presets. Improves posture and productivity.",
    price: 399.99,
    discountPrice: 349.99,
    image: "images/standing-desk",
    category: "Furniture",
    stock: 8,
    rating: 4.5,
    reviews: 76,
  },
];

// Shopping cart
let cart = [];

// State variables
let filteredProducts = [...products];
let currentPage = 1;
let productsPerPage = 9;
let isGridView = true;
let activeFilters = {
  categories: [],
  minPrice: 0,
  maxPrice: 1000,
  rating: null,
  inStockOnly: false,
};

// DOM elements
const productGrid = document.getElementById("product-grid");
const productsCount = document.getElementById("products-count");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const productModal = document.getElementById("product-modal");
const cartModal = document.getElementById("cart-modal");
const activeFilterTags = document.getElementById("active-filter-tags");

// Initialize the app
document.addEventListener("DOMContentLoaded", function () {
  renderProducts();
  updateProductsCount();
  setupEventListeners();
  updateCartCount();
});

// Render products
function renderProducts() {
  productGrid.innerHTML = "";

  // Calculate pagination
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Set grid or list view
  if (isGridView) {
    productGrid.classList.remove("list-view");
  } else {
    productGrid.classList.add("list-view");
  }

  paginatedProducts.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = isGridView
      ? "product-card"
      : "product-card list-item";

    const priceHTML = product.discountPrice
      ? `<span class="price">$${product.discountPrice}</span>
               <span class="discount">$${product.price}</span>`
      : `<span class="price">$${product.price}</span>`;

    const starsHTML = generateStars(product.rating);

    if (isGridView) {
      productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-rating">
                        ${starsHTML}
                        <span>(${product.reviews})</span>
                    </div>
                    <div class="product-price">
                        ${priceHTML}
                    </div>
                    <div class="product-actions">
                        <button class="view-details" data-id="${product.id}">View Details</button>
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `;
    } else {
      productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-rating">
                        ${starsHTML}
                        <span>(${product.reviews})</span>
                    </div>
                    <div class="product-price">
                        ${priceHTML}
                    </div>
                    <div class="product-actions">
                        <button class="view-details" data-id="${product.id}">View Details</button>
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `;
    }

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

// Generate star rating HTML
function generateStars(rating) {
  let starsHTML = "";
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star"></i>';
  }

  if (hasHalfStar) {
    starsHTML += '<i class="fas fa-star-half-alt"></i>';
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star"></i>';
  }

  return starsHTML;
}

// Update products count
function updateProductsCount() {
  productsCount.textContent = filteredProducts.length;
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

  // View toggle
  document.getElementById("grid-view").addEventListener("click", function () {
    isGridView = true;
    this.classList.add("active");
    document.getElementById("list-view").classList.remove("active");
    renderProducts();
  });

  document.getElementById("list-view").addEventListener("click", function () {
    isGridView = false;
    this.classList.add("active");
    document.getElementById("grid-view").classList.remove("active");
    renderProducts();
  });

  // Sort functionality
  document
    .getElementById("sort-select")
    .addEventListener("change", function () {
      sortProducts(this.value);
    });

  // Category filters
  document.querySelectorAll(".category-filter").forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        if (!activeFilters.categories.includes(this.value)) {
          activeFilters.categories.push(this.value);
        }
      } else {
        activeFilters.categories = activeFilters.categories.filter(
          (cat) => cat !== this.value
        );
      }
      applyFilters();
    });
  });

  // Price range filter
  document
    .getElementById("apply-price-filter")
    .addEventListener("click", function () {
      activeFilters.minPrice =
        parseFloat(document.getElementById("min-price").value) || 0;
      activeFilters.maxPrice =
        parseFloat(document.getElementById("max-price").value) || 1000;
      applyFilters();
    });

  // Rating filters
  document.querySelectorAll(".rating-filter").forEach((radio) => {
    radio.addEventListener("change", function () {
      activeFilters.rating = this.checked ? parseInt(this.value) : null;
      applyFilters();
    });
  });

  // In stock filter
  document
    .getElementById("in-stock-filter")
    .addEventListener("change", function () {
      activeFilters.inStockOnly = this.checked;
      applyFilters();
    });

  // Clear filters
  document
    .getElementById("clear-filters")
    .addEventListener("click", function () {
      activeFilters = {
        categories: [],
        minPrice: 0,
        maxPrice: 1000,
        rating: null,
        inStockOnly: false,
      };

      // Reset UI
      document.querySelectorAll(".category-filter").forEach((checkbox) => {
        checkbox.checked = false;
      });
      document.getElementById("min-price").value = 0;
      document.getElementById("max-price").value = 1000;
      document.querySelectorAll(".rating-filter").forEach((radio) => {
        radio.checked = false;
      });
      document.getElementById("in-stock-filter").checked = false;

      applyFilters();
    });

  // Pagination
  document.getElementById("prev-page").addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      renderProducts();
      updatePaginationUI();
    }
  });

  document.getElementById("next-page").addEventListener("click", function () {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderProducts();
      updatePaginationUI();
    }
  });

  // Page numbers
  document.querySelectorAll(".page-number").forEach((button) => {
    button.addEventListener("click", function () {
      currentPage = parseInt(this.textContent);
      renderProducts();
      updatePaginationUI();
    });
  });

  // Search functionality
  document.getElementById("search-btn").addEventListener("click", function () {
    const searchTerm = document
      .getElementById("search-input")
      .value.toLowerCase();
    filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    renderProducts();
    updateProductsCount();
    updatePaginationUI();
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

// Apply filters
function applyFilters() {
  filteredProducts = products.filter((product) => {
    // Category filter
    if (
      activeFilters.categories.length > 0 &&
      !activeFilters.categories.includes(product.category)
    ) {
      return false;
    }

    // Price filter
    const price = product.discountPrice || product.price;
    if (price < activeFilters.minPrice || price > activeFilters.maxPrice) {
      return false;
    }

    // Rating filter
    if (
      activeFilters.rating !== null &&
      product.rating < activeFilters.rating
    ) {
      return false;
    }

    // Stock filter
    if (activeFilters.inStockOnly && product.stock <= 0) {
      return false;
    }

    return true;
  });

  currentPage = 1;
  renderProducts();
  updateProductsCount();
  updatePaginationUI();
  updateActiveFilterTags();
}

// Update active filter tags
function updateActiveFilterTags() {
  activeFilterTags.innerHTML = "";

  // Category tags
  activeFilters.categories.forEach((category) => {
    const tag = document.createElement("span");
    tag.className = "filter-tag";
    tag.innerHTML = `${category} <i class="fas fa-times" data-category="${category}"></i>`;
    activeFilterTags.appendChild(tag);
  });

  // Price range tag
  if (activeFilters.minPrice > 0 || activeFilters.maxPrice < 1000) {
    const tag = document.createElement("span");
    tag.className = "filter-tag";
    tag.innerHTML = `$${activeFilters.minPrice} - $${activeFilters.maxPrice} <i class="fas fa-times" data-price="true"></i>`;
    activeFilterTags.appendChild(tag);
  }

  // Rating tag
  if (activeFilters.rating !== null) {
    const tag = document.createElement("span");
    tag.className = "filter-tag";
    tag.innerHTML = `${activeFilters.rating}★ & Up <i class="fas fa-times" data-rating="true"></i>`;
    activeFilterTags.appendChild(tag);
  }

  // In stock tag
  if (activeFilters.inStockOnly) {
    const tag = document.createElement("span");
    tag.className = "filter-tag";
    tag.innerHTML = `In Stock Only <i class="fas fa-times" data-stock="true"></i>`;
    activeFilterTags.appendChild(tag);
  }

  // Add event listeners to remove tags
  document.querySelectorAll(".filter-tag i").forEach((icon) => {
    icon.addEventListener("click", function () {
      if (this.dataset.category) {
        activeFilters.categories = activeFilters.categories.filter(
          (cat) => cat !== this.dataset.category
        );
        document.querySelector(
          `.category-filter[value="${this.dataset.category}"]`
        ).checked = false;
      } else if (this.dataset.price) {
        activeFilters.minPrice = 0;
        activeFilters.maxPrice = 1000;
        document.getElementById("min-price").value = 0;
        document.getElementById("max-price").value = 1000;
      } else if (this.dataset.rating) {
        activeFilters.rating = null;
        document.querySelectorAll(".rating-filter").forEach((radio) => {
          radio.checked = false;
        });
      } else if (this.dataset.stock) {
        activeFilters.inStockOnly = false;
        document.getElementById("in-stock-filter").checked = false;
      }
      applyFilters();
    });
  });
}

// Update pagination UI
function updatePaginationUI() {
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Update prev/next buttons
  document.getElementById("prev-page").disabled = currentPage === 1;
  document.getElementById("next-page").disabled = currentPage === totalPages;

  // Update page numbers
  const pageNumbers = document.querySelectorAll(".page-number");
  pageNumbers.forEach((button, index) => {
    button.classList.remove("active");
    if (index + 1 === currentPage) {
      button.classList.add("active");
    }
    button.disabled = false;
  });
}

// Sort products
function sortProducts(sortBy) {
  switch (sortBy) {
    case "price-low":
      filteredProducts.sort((a, b) => {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;
        return priceA - priceB;
      });
      break;
    case "price-high":
      filteredProducts.sort((a, b) => {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;
        return priceB - priceA;
      });
      break;
    case "name":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    default:
      // Reset to original order
      filteredProducts = [...products];
      applyFilters();
      return;
  }

  renderProducts();
}

// Show product details in modal
function showProductDetails(productId) {
  const product = products.find((p) => p.id === productId);

  if (!product) return;

  const priceHTML = product.discountPrice
    ? `<span id="modal-product-price">$${product.discountPrice}</span>
           <span id="modal-product-discount" class="discount">$${product.price}</span>`
    : `<span id="modal-product-price">$${product.price}</span>`;

  const starsHTML = generateStars(product.rating);

  document.getElementById("modal-product-image").src = product.image;
  document.getElementById("modal-product-image").alt = product.name;
  document.getElementById("modal-product-title").textContent = product.name;
  document.getElementById("modal-product-description").textContent =
    product.description;
  document.getElementById("modal-product-rating").innerHTML = starsHTML;
  document.getElementById(
    "modal-product-reviews"
  ).textContent = `(${product.reviews} reviews)`;
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
                    <div class="cart-item-price">$${price}</div>
                    <div class="cart-item-quantity">
                        <button class="decrease-quantity" data-id="${item.id}">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="increase-quantity" data-id="${item.id}">+</button>
                    </div>
                    <div class="cart-item-remove" data-id="${item.id}">Remove</div>
                </div>
                <div class="cart-item-subtotal">
                    $${subtotal}
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
          updateCartItemQuantity(
            itemId,
            newQuantity - getCartItemQuantity(itemId)
          );
        } else {
          this.value = getCartItemQuantity(itemId);
        }
      });
    });

    document.querySelectorAll(".cart-item-remove").forEach((button) => {
      button.addEventListener("click", function () {
        const itemId = parseInt(this.getAttribute("data-id"));
        removeCartItem(itemId);
      });
    });
  }

  updateCartTotal();
  cartModal.style.display = "block";
}

// Get cart item quantity
function getCartItemQuantity(itemId) {
  const item = cart.find((item) => item.id === itemId);
  return item ? item.quantity : 0;
}

// Update cart item quantity
function updateCartItemQuantity(itemId, change) {
  const item = cart.find((item) => item.id === itemId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeCartItem(itemId);
    } else {
      showCart();
      updateCartCount();
    }
  }
}

// Remove cart item
function removeCartItem(itemId) {
  cart = cart.filter((item) => item.id !== itemId);
  showCart();
  updateCartCount();
}

// Update cart total
function updateCartTotal() {
  const total = cart.reduce((sum, item) => {
    const price = item.discountPrice || item.price;
    return sum + price * item.quantity;
  }, 0);

  cartTotal.textContent = `$${total.toFixed(2)}`;
}
