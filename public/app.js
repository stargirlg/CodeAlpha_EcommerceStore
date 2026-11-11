let currentUser = null;
let cart = [];

// Fetch and display products from Express API[cite: 1]
async function loadProducts() {
  const res = await fetch('/api/products');
  const products = await res.json();
  const container = document.getElementById('product-list');
  container.innerHTML = '';

  products.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <div>
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <p><strong>₹${p.price}</strong></p>
        </div>
        <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(name, price) {
  cart.push({ name, price });
  renderCart();
}

function renderCart() {
  const list = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  list.innerHTML = '';
  let total = 0;

  cart.forEach((item) => {
    total += item.price;
    list.innerHTML += `<li><span>${item.name}</span> <span>₹${item.price}</span></li>`;
  });

  totalEl.innerText = total;
}

async function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const res = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  alert(data.message || data.error);
}

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  if (data.username) {
    currentUser = data.username;
    document.getElementById('user-display').innerText = `Logged in as: ${currentUser}`;
    alert("Logged in successfully!");
  } else {
    alert(data.error);
  }
}

async function checkout() {
  if (!currentUser) return alert("Please log in first to place an order.");
  if (cart.length === 0) return alert("Your cart is empty.");

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: currentUser, items: cart, total })
  });
  const data = await res.json();
  alert(data.message);
  cart = [];
  renderCart();
}

loadProducts();