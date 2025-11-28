// Shopping cart
let cart = [];

// DOM elements
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartModal = document.getElementById("cart-modal");

// Initialize the app
document.addEventListener("DOMContentLoaded", function () {
  setupEventListeners();
  updateCartCount();
});

// Setup event listeners
function setupEventListeners() {
  // Account navigation
  document.querySelectorAll(".account-nav .nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Skip logout link
      if (this.classList.contains("logout")) {
        if (confirm("Are you sure you want to logout?")) {
          alert("You have been logged out successfully.");
          window.location.href = "index.html";
        }
        return;
      }

      // Remove active class from all links and tabs
      document
        .querySelectorAll(".account-nav .nav-link")
        .forEach((l) => l.classList.remove("active"));
      document
        .querySelectorAll(".tab-content")
        .forEach((t) => t.classList.remove("active"));

      // Add active class to clicked link
      this.classList.add("active");

      // Show corresponding tab
      const tabId = this.getAttribute("data-tab") + "-tab";
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === cartModal) {
      cartModal.style.display = "none";
    }
  });

  // Cart icon
  document.querySelector(".cart-icon").addEventListener("click", function () {
    showCart();
  });

  // Profile form
  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Profile updated successfully!");
    });
  }

  // Password form
  const passwordForm = document.getElementById("password-form");
  if (passwordForm) {
    passwordForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Password changed successfully!");
    });
  }

  // Address forms
  const addressForms = document.querySelectorAll(".address-form");
  addressForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Address saved successfully!");
    });
  });

  // Payment method form
  const paymentForm = document.getElementById("payment-form");
  if (paymentForm) {
    paymentForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Payment method added successfully!");
    });
  }

  // Notification settings form
  const notificationForm = document.getElementById("notification-form");
  if (notificationForm) {
    notificationForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Notification preferences updated!");
    });
  }

  // Order filters
  const orderFilter = document.getElementById("order-filter");
  if (orderFilter) {
    orderFilter.addEventListener("change", function () {
      filterOrders();
    });
  }

  const orderSearch = document.getElementById("order-search");
  if (orderSearch) {
    orderSearch.addEventListener("keyup", function () {
      filterOrders();
    });
  }
}

// Filter orders
function filterOrders() {
  const filterValue = document.getElementById("order-filter").value;
  const searchValue = document
    .getElementById("order-search")
    .value.toLowerCase();

  document.querySelectorAll(".order-item").forEach((item) => {
    const status = item.querySelector(".status").textContent.toLowerCase();
    const orderNumber = item.querySelector("h4").textContent.toLowerCase();

    let showItem = true;

    // Filter by status
    if (filterValue !== "all" && !status.includes(filterValue)) {
      showItem = false;
    }

    // Filter by order number
    if (searchValue && !orderNumber.includes(searchValue)) {
      showItem = false;
    }

    item.style.display = showItem ? "flex" : "none";
  });
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
                    <div class="cart-item-price">$${price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="decrease-quantity" data-id="${
                          item.id
                        }">-</button>
                        <input type="number" value="${
                          item.quantity
                        }" min="1" data-id="${item.id}">
                        <button class="increase-quantity" data-id="${
                          item.id
                        }">+</button>
                    </div>
                    <div class="cart-item-remove" data-id="${
                      item.id
                    }">Remove</div>
                </div>
                <div class="cart-item-subtotal">
                    <span>$${subtotal}</span>
                </div>
            `;

      cartItems.appendChild(cartItem);
    });

    // Add event listeners to quantity buttons
    document.querySelectorAll(".decrease-quantity").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        updateCartQuantity(productId, -1);
      });
    });

    document.querySelectorAll(".increase-quantity").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        updateCartQuantity(productId, 1);
      });
    });

    document.querySelectorAll(".cart-item-remove").forEach((button) => {
      button.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        removeFromCart(productId);
      });
    });

    document.querySelectorAll(".cart-item-quantity input").forEach((input) => {
      input.addEventListener("change", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        const newQuantity = parseInt(this.value);
        setCartQuantity(productId, newQuantity);
      });
    });
  }

  updateCartTotal();
  cartModal.style.display = "block";
}

// Update cart total
function updateCartTotal() {
  let total = 0;

  cart.forEach((item) => {
    const price = item.discountPrice || item.price;
    total += price * item.quantity;
  });

  cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Update cart quantity
function updateCartQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);

  if (item) {
    item.quantity += change;

    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartCount();
      showCart();
    }
  }
}

// Set cart quantity
function setCartQuantity(productId, quantity) {
  const item = cart.find((item) => item.id === productId);

  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = quantity;
      updateCartCount();
      showCart();
    }
  }
}

// Remove from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartCount();
  showCart();
}
