// cart.js

// Fetch cart from localStorage or initialize as empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add item to cart
function addToCart(itemName, price) {
  cart.push({ name: itemName, price: price });
  localStorage.setItem("cart", JSON.stringify(cart));

  // Simple feedback to user
  alert(`${itemName} added to cart!`);
}

// Function to display cart items on cart.html
function displayCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  // Clear previous display
  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceElement.textContent = "₹0";
    return;
  }

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <span>${item.name}</span>
      <span>₹${item.price}</span>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartContainer.appendChild(itemDiv);
    total += item.price;
  });

  totalPriceElement.textContent = `₹${total}`;
}

// Function to remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart(); // Refresh cart display
}

// Call displayCart only if we are on cart.html
if (document.readyState !== "loading") {
  if (document.getElementById("cart-items")) {
    displayCart();
  }
} else {
  document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("cart-items")) {
      displayCart();
    }
  });
}
