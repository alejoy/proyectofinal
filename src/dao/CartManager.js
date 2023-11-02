import ProductModel from '../models/products.model.js';
import { Exception } from '../utils.js';

export default class ProductManager {
  
  static get(query = {}) {
    const criteria = {};
    if (query.course) {
      criteria.course = query.course;
    }
    return ProductModel.find(criteria);
  }

  static async getById(sid) {
    const product = await ProductModel.findById(sid);
    if (!product) {
      throw new Exception('No existe el producto 😨', 404);
    }
    return product;
  }

  static async create(data) {
    const product = await ProductModel.create(data);
    console.log('Producto creado correctamente 😁');
    return product;
  }

  static async updateById(sid, data) {
    const product = await ProductModel.findById(sid);
    if (!product) {
      throw new Exception('No existe el producto 😨', 404);
    }
    const criteria = { _id: sid };
    const operation = { $set: data };
    await ProductModel.updateOne(criteria, operation);
    console.log('Producto actualizado correctamente 😁');
  }

  static async addProduct (sid, data) {
    const body = req.body;
    const cart = await CartModel.findById(cid);
    const index = cart.products.findIndex((product) => String(product._id) === pid);

    if (index === -1) {
      cart.products.push({ product: pid, quantity: body.quantity });
    } else {
      cart.products[index].quantity += body.quantity;
    }
    await CartModel.updateOne({ _id: cid }, cart);
  }

  static async deleteById(sid) {
    const product = await ProductModel.findById(sid);
    if (!product) {
      throw new Exception('No existe el producto 😨', 404);
    }
    const criteria = { _id: sid };
    await ProductModel.deleteOne(criteria);
    console.log('Producto eliminado correctamente 😑');
  }
}