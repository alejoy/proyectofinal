import { Router } from 'express';
import ProductManager from '../../dao/CartManager.js';

const router = Router();

/* router.get('/products', async (req, res) => {
  const { query = {} } = req;
  const products = await ProductManager.get(query);
  res.status(200).json(products);
});

router.get('/products/:sid', async (req, res) => {
  try {
    const { params: { sid } } = req;
    const product = await ProductManager.getById(sid);
    res.status(200).json(product);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}); */

// Ruta para crear un nuevo carrito
router.post('/cart', async (req, res) => {
  const { body } = req;
  const cart = await CartManager.create(body);
  res.status(201).json(cart);
});

/* router.put('/products/:sid', async (req, res) => {
  try {
    const { params: { sid }, body } = req;
    await ProductManager.updateById(sid, body);
    res.status(204).end();
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.delete('/products/:sid', async (req, res) => {
  try {
    const { params: { sid } } = req;
    await ProductManager.deleteById(sid);
    res.status(204).end();
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}); */

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