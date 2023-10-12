import express from 'express';
import fs from 'fs';
import { generateNewCartId, getById} from '../utils.js';


const router = express.Router();
const DB_PATH = './src/data/carrito.json';

// Ruta para crear un nuevo carrito
router.post('/', (req, res) => {
  const newCart = req.body;
  const cartsData = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  newCart.id = generateNewCartId();
  cartsData.push({...newCart, products: []});
  fs.writeFileSync(DB_PATH, JSON.stringify(cartsData, null, 2));
  res.json(newCart);
});


// Ruta para listar los productos de un carrito por ID de carrito
router.get('/:cid', (req, res) => {
  const cart = getById(req.params.cid, DB_PATH);
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

// Ruta para agregar un producto a un carrito por ID de carrito y ID de producto
router.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const quantity = req.body.quantity;
  const cartsData = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  const cart = cartsData.find((c) => c.id === cartId);
  if (cart) {
    const productsData = JSON.parse(fs.readFileSync('./src/data/productos.json', 'utf8'));
    const product = productsData.find((p) => p.id === productId);
    console.log(product);
    if (product) {
      const existingProduct = cart.products.find((p) => p.id === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ id: productId, quantity });
      }
      fs.writeFileSync(DB_PATH, JSON.stringify(cartsData, null, 2));
      res.json(cart.products);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

export default router;
