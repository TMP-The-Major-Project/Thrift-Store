# The Thrift Project

Welcome to The Thrift Project! This is a web application designed to provide users with a platform to buy and sell thrifted clothing and accessories. The application features user authentication, product recommendations, a shopping cart, and an admin dashboard for managing products.

## Table of Contents

1. [Table of Contents](#table-of-contents)
2. [Features](#features)  
3. [Technologies Used](#technologies-used)  
4. [Getting Started](#getting-started)  
    - [Prerequisites](#prerequisites)  
    - [Installation](#installation)  
5. [Usage](#usage)  
6. [API Endpoints](#api-endpoints)  
    - [Authentication](#authentication)  
    - [Products](#products)  
    - [Cart](#cart)  
7. [Contributing](#contributing)  
8. [License](#license)  

---

## Features

- **User Authentication**: Users can register, log in, and log out.  
- **Product Listings**: Browse and search through a variety of thrifted products.  
- **Shopping Cart**: Add products to a cart and proceed to checkout.  
- **Product Recommendations**: Personalized product recommendations based on user behavior.  
- **Admin Dashboard**: Admins can add, edit, and delete products from the inventory.  

---

## Technologies Used

- **Frontend**: React, React Router, Axios, CSS  
- **Backend**: Go (Fiber framework), MongoDB/PostgreSQL  
- **Machine Learning**: Python (Pandas, Scikit-learn) for product recommendations  
- **Deployment**: Docker, Heroku (or any other cloud platform)  

---

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

Ensure the following tools are installed:  
- Node.js and npm (for frontend)  
- Go (for backend)  
- MongoDB or PostgreSQL (for database)  
- Python (for recommendation system)  
- Docker (optional, for containerization)  

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/thrift-store.git
   cd thrift-store
   ```

2. Set up the backend:

- Navigate to the backend directory and install dependencies:

  ``` bash
  cd backend
  go mod tidy
  ```
  
-  Set up your database and update the .env file with your database credentials.

3. Set up the frontend:

- Navigate to the frontend directory and install dependencies:

  ``` bash
  cd frontend
  npm install
  ```

4. Set up ML model:

- Navigate to the model/Recomender folder and setup virtual environment:

  ``` bash
  cd model/Recomender
  source venv/bin/activate
  pip install -r requirements.txt
  ```

5. Run the applications:

- Start the backend server:

  ``` bash
  go run main.go

  ```
- Start the frontend server:

  ``` bash
  npm start

  ```
- Start the ML Model server:

  ``` bash
  python main.py

  ```
6. Access the application:
Open your browser and navigate to `http://localhost:3000`

## Usage

    Create an account or log in to access the features.
    Browse through the products and add items to your cart.
    Proceed to checkout to complete your purchase.
    Admin users can manage products through the admin dashboard.
---
## API Endpoints
### Authentication

    POST /login: Log in a user.
    POST /register: Register a new user.
    POST /logout: Log out a user.

### Products

    GET /products: Retrieve all products.
    GET /products/:id: Retrieve a product by ID.
    POST /products/add: Add a new product.
    PUT /products/:id: Update a product by ID.
    DELETE /products/:id: Delete a product by ID.

### Cart

    POST /cart/add: Add an item to the cart.
    DELETE /cart/delete/:id: Remove an item from the cart.
    GET /cart/items: Get all items in the cart.
    GET /cart/total: Get the total price of items in the cart.
    DELETE /cart/clear: Clear all items in the cart.
---

## Contribution
Contributions are welcome! Please feel free to submit a pull request or open an issue to discuss improvements or bugs.
You can read the complete Contributing Guide here - [Contribution Guide](.github/CONTRIBUTING.md)

---

## License

This project is licensed under the BSD 3-Clause License - see the [LICENSE](LICENSE) file for details.
