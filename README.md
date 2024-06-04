# E-commerce Backend

This is the backend for an e-commerce application built with Node.js, Express, and MySQL.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Node.js
- MySQL

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository

#Set up MySQL database:

Start your MySQL server.

Create a new database and tables by running the following SQL commands:

sql
Copy code
CREATE DATABASE ecommerce;

USE ecommerce;

CREATE TABLE Products (
  id INT,
  name VARCHAR(255),
  price DECIMAL(10, 2),
  category VARCHAR(255)
);

INSERT INTO Products (id, name, price, category) VALUES
(1, 'Lounge Chair', 2000, 'Chairs'),
(2, 'Dining Chair', 1800, 'Chairs'),
(3, 'Table1', 3000, 'Tables'),
(4, 'Table2', 3200, 'Tables'),
(5, 'Table3', 3100, 'Tables'),
(6, 'Dining Top', 900, 'Dining tops');
Configure database connection:

Open server.js and ensure the database connection settings match your MySQL setup:

javascript

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'ecommerce'
});
Run the server:

bash

node server.js
You should see Server running on port 5000 and MySQL connected as id ... in your terminal.

API Endpoints
Get Products
URL: /api/products

Method: GET

Description: Fetches all products from the database.

Response:

json

[
  {
    "id": 1,
    "name": "Lounge Chair",
    "price": 2000,
    "category": "Chairs"
  },
  {
    "id": 2,
    "name": "Dining Chair",
    "price": 1800,
    "category": "Chairs"
  },
  {
    "id": 3,
    "name": "Table1",
    "price": 3000,
    "category": "Tables"
  },
  {
    "id": 4,
    "name": "Table2",
    "price": 3200,
    "category": "Tables"
  },
  {
    "id": 5,
    "name": "Table3",
    "price": 3100,
    "category": "Tables"
  },
  {
    "id": 6,
    "name": "Dining Top",
    "price": 900,
    "category": "Dining tops"
  }
]
Debugging
Console Logs
The server logs provide useful information for debugging:

When a request is received at /api/products.
The results of the query or an error if the query fails.
Sample Output
plaintext

Server running on port 5000
MySQL connected as id 10
Received request to /api/products
Query results: [
  { id: 1, name: 'Lounge Chair', price: 2000, category: 'Chairs' },
  { id: 2, name: 'Dining Chair', price: 1800, category: 'Chairs' },
  ...
]


Common Issues
404 Not Found:
Ensure that the frontend is making requests to the correct endpoint (http://localhost:5000/api/products).

Database Connection Error:
Verify your MySQL server is running and the connection settings in server.js are correct.

