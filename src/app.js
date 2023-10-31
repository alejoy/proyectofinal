import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';

import { __dirname } from './utils.js';
import productsViewRouter from './routers/views/products.router.js';
import productsApiRouter from './routers/api/products.router.js';
import carts from './routers/api/carts.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.send('Hello from backend 🖐️');
});

app.use('/', productsViewRouter);
app.use('/api', productsApiRouter);

app.use((error, req, res, next) => {
  const message = `Ah ocurrido un error inesperado 😨: ${error.message}`;
  console.error(message);
  res.status(500).json({ message });
});

export default app;