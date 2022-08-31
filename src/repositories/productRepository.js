/* eslint-disable class-methods-use-this */
import { Product } from '../schema/productSchema';

// eslint-disable-next-line import/prefer-default-export
export class ProductRepository {
  async insertProduct(product) {
    try {
      if (!product.name || !product.color || !product.value) {
        throw new Error('invalid data');
      }
      return Product.create(product);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async removeProduct(id) {
    try {
      await Product.deleteOne({ _id: id });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProduct(product) {
    try {
      const productMatched = await Product.findOne({ _id: product.id });

      if (product.name) productMatched.name = product.name;
      if (product.color) productMatched.color = product.color;
      if (product.value) productMatched.value = product.value;
      await productMatched.save();
      return productMatched;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async showProduct() {
    try {
      return await Product.find({});
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
