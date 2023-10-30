import mongoose from 'mongoose';

export const init = async () => {
  try {
    const URI = 'mongodb+srv://developer:4IyZ8uqIVQUny4nS@cluster0.hstycov.mongodb.net/';
    await mongoose.connect(URI);
    console.log('Database conected 🚀');
  } catch (error) {
    console.log('Ah ocurrido un error al intentar conectarnos a la DB', error.message);
  }
}