import express from 'express';
import fs from 'fs';
import { generateNewProductId, getById } from '../utils.js';

const router = express.Router();
const DB_PATH = './src/data/productos.json';
// Ruta para listar todos los productos
router.get('/', (req, res) => {
  const productsData = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  res.json(productsData);
});

// Ruta para obtener un producto por ID
router.get('/:pid', (req, res) => {
  const product = getById(req.params.pid, DB_PATH);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Ruta para agregar un nuevo producto
router.post('/', (req, res) => {
  const newProduct = req.body;
  const productsData = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  newProduct.id = generateNewProductId();
  productsData.push(newProduct);
  fs.writeFileSync(DB_PATH, JSON.stringify(productsData, null, 2));
  res.json(newProduct);
});

// Ruta para actualizar un producto por ID
router.put('/:pid', (req, res) => {
  const productId = req.params.pid;
  const updatedProduct = req.body;
  const productsData = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  const index = productsData.findIndex((p) => p.id === productId);
  if (index !== -1) {
    productsData[index] = { ...productsData[index], ...updatedProduct };
    fs.writeFileSync(DB_PATH, JSON.stringify(productsData, null, 2));
    res.json(productsData[index]);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

// Ruta para eliminar un producto por ID
router.delete('/:pid', (req, res) => {
  const productId = req.params.pid;
  const productsData = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  const updatedProducts = productsData.filter((p) => p.id !== productId);
  fs.writeFileSync(DB_PATH, JSON.stringify(updatedProducts, null, 2));
  res.json({ message: 'Producto eliminado con éxito' });
});

export default router;
