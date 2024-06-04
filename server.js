const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ecommerce'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Get products
app.get('/api/products', (req, res) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

// Checkout
app.post('/api/checkout', (req, res) => {
  const { user, cart } = req.body;

  db.beginTransaction(err => {
    if (err) throw err;

    // Insert user
    const userQuery = 'INSERT INTO Users (name, email) VALUES (?, ?)';
    db.query(userQuery, [user.name, user.email], (err, result) => {
      if (err) {
        return db.rollback(() => {
          throw err;
        });
      }

      const userId = result.insertId;
      const totalAmount = cart.reduce((acc, product) => acc + product.price, 0);

      // Insert order
      const orderQuery = 'INSERT INTO `Order` (amount, user_id) VALUES (?, ?)';
      db.query(orderQuery, [totalAmount, userId], (err, result) => {
        if (err) {
          return db.rollback(() => {
            throw err;
          });
        }

        const orderId = result.insertId;
        const chairItems = cart.filter(item => item.category === 'Chairs');
        const tableItems = cart.filter(item => item.category === 'Tables');
        const topItems = cart.filter(item => item.category === 'Dining tops');

        const insertOrderItems = (table, items) => {
          return new Promise((resolve, reject) => {
            if (items.length === 0) return resolve();
            const query = `INSERT INTO ${table} (order_id, ${table.slice(6, -1)}_id) VALUES ?`;
            const values = items.map(item => [orderId, item.id]);
            db.query(query, [values], (err, result) => {
              if (err) return reject(err);
              resolve(result);
            });
          });
        };

        Promise.all([
          insertOrderItems('Order_Chairs', chairItems),
          insertOrderItems('Order_Tables', tableItems),
          insertOrderItems('Order_Tops', topItems)
        ])
          .then(() => {
            db.commit(err => {
              if (err) {
                return db.rollback(() => {
                  throw err;
                });
              }
              res.status(200).send('Order placed successfully');
            });
          })
          .catch(err => {
            db.rollback(() => {
              throw err;
            });
          });
      });
    });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
