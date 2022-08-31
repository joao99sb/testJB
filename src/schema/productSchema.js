import { mongoose } from '../database';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  value: {
    type: Number,
  },
});

const Product = mongoose.model('Product', productSchema);

// eslint-disable-next-line import/prefer-default-export
export { Product };
