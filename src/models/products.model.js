import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  status: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String },
  thumbnails: { type: String },
}, { timestamps: true });

export default mongoose.model('Products', productsSchema);