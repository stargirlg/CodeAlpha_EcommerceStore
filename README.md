# CodeAlpha_EcommerceStore

A full-stack e-commerce web application built as part of the **CodeAlpha Full Stack Development Internship**[cite: 1]. This platform features interactive product listings, real-time cart handling, user registration and login, and transactional order processing backed by an SQLite relational database[cite: 1, 2].

---

##  Features

* **Product Catalog**: Displays available items with detailed descriptions and dynamic pricing fetched directly from backend APIs[cite: 1].
* **Shopping Cart**: Client-side interactive cart allowing users to add items, calculate totals dynamically, and clear items after order completion[cite: 1].
* **User Authentication**: Secure user registration and login system backed by persistent user accounts[cite: 1, 2].
* **Order Processing**: Validates cart data upon checkout, updates order logs, and assigns auto-incremented order IDs[cite: 1].

---

##  Tech Stack

* **Frontend**: HTML5, CSS3, JavaScript (ES6+, DOM Manipulation, Async Fetch API)[cite: 1]
* **Backend**: Node.js, Express.js (RESTful API Architecture)[cite: 1]
* **Database**: SQLite3 (Relational Schema & Data Seeding)[cite: 1, 2]
* **Development Environment**: GitHub Codespaces, Git

---

##  REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Fetches all products from the database[cite: 1] |
| `POST` | `/api/register` | Registers a new user account[cite: 1, 2] |
| `POST` | `/api/login` | Authenticates existing user credentials[cite: 1, 2] |
| `POST` | `/api/orders` | Processes and stores customer orders[cite: 1] |

---

##  How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/stargirlg/CodeAlpha_EcommerceStore.git](https://github.com/stargirlg/CodeAlpha_EcommerceStore.git)
   cd CodeAlpha_EcommerceStore
