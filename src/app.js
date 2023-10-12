import express from 'express';
import products from './routers/products.router.js';
import carts from './routers/carts.router.js';

const app = express();
const port = 8080;

app.use(express.json());

// Rutas para productos
app.use('/api/products', products);

// Rutas para carritos
app.use('/api/carts', carts);

app.listen(port, () => {
  console.log(`🚀 Server running on ${port}`);
});
