import { DUMMY_PRODUCTS } from "./products.js";

let cartItems = [];

document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("products");
  const cartButton = document.getElementById("cart-button");
  const modal = document.getElementById("modal");
  const closeButton = document.getElementById("close-button");
  const checkoutButton = document.getElementById("checkout-button");
  const cartContainer = document.getElementById("cart");

  // Render products
  DUMMY_PRODUCTS.forEach((product) => {
    const productItem = document.createElement("li");
    productItem.classList.add("product");
    productItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class="product-content">
                <div>
                    <h3>${product.title}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <p>${product.description}</p>
                </div>
                <p class="product-actions">
                    <button class="add-to-cart" data-id="${
                      product.id
                    }">Add to Cart</button>
                </p>
            </div>
        `;
    productsContainer.appendChild(productItem);
  });

  // Update cart quantity
  function updateCartQuantity() {
    cartButton.textContent = `Cart (${cartItems.length})`;
  }

  // Update cart display
  function updateCartDisplay() {
    if (cartItems.length === 0) {
      cartContainer.innerHTML = "<p>No items in cart!</p>";
    } else {
      cartContainer.innerHTML = `
                <ul id="cart-items">
                    ${cartItems
                      .map(
                        (item) => `
                        <li>
                            <div>
                                <span>${item.title}</span>
                                <span> ($${item.price.toFixed(2)})</span>
                            </div>
                            <div class="cart-item-actions">
                                <button class="decrease-quantity" data-id="${
                                  item.id
                                }">-</button>
                                <span>${item.quantity}</span>
                                <button class="increase-quantity" data-id="${
                                  item.id
                                }">+</button>
                            </div>
                        </li>
                    `
                      )
                      .join("")}
                </ul>
                <p id="cart-total-price">
                    Cart Total: <strong>$${cartItems
                      .reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}</strong>
                </p>
            `;
    }

    // Add event listeners for increase and decrease buttons
    document.querySelectorAll(".increase-quantity").forEach((button) => {
      button.addEventListener("click", () =>
        updateItemQuantity(button.dataset.id, 1)
      );
    });

    document.querySelectorAll(".decrease-quantity").forEach((button) => {
      button.addEventListener("click", () =>
        updateItemQuantity(button.dataset.id, -1)
      );
    });
  }

  // Add item to cart
  function addToCart(id) {
    const product = DUMMY_PRODUCTS.find((p) => p.id === id);
    const existingItem = cartItems.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    updateCartQuantity();
    updateCartDisplay();
  }

  // Update item quantity in cart
  function updateItemQuantity(id, delta) {
    const item = cartItems.find((item) => item.id === id);

    if (item) {
      item.quantity += delta;

      if (item.quantity <= 0) {
        cartItems = cartItems.filter((item) => item.id !== id);
      }

      updateCartQuantity();
      updateCartDisplay();
    }
  }

  // Open cart modal
  cartButton.addEventListener("click", () => {
    modal.showModal();
  });

  // Close cart modal
  closeButton.addEventListener("click", () => {
    modal.close();
  });

  // Checkout button action
  checkoutButton.addEventListener("click", () => {
    alert("Checkout process");
    modal.close();
  });

  // Add event listeners for Add to Cart buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => addToCart(button.dataset.id));
  });

  updateCartQuantity();
  updateCartDisplay();
});
