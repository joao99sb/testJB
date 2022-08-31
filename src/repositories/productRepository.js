/* eslint-disable class-methods-use-this */
import { Product } from '../schema/productSchema';

// eslint-disable-next-line import/prefer-default-export
export class ProductRepository {
  constructor() {
    this.product = Product;
  }

  async insertProduct(product) {
    if (!product.name || !product.color || !product.value) {
      throw new Error('invalid data');
    }
    return this.product.create(product);
  }

  async removeProduct(id) {
    try {
      await this.product.deleteOne({ _id: id });
      const productCheck = await this.product.countDocuments({ _id: id });
      if (productCheck !== 0) throw new Error('error in delete');
    } catch (error) {
      throw new Error('error in delete');
    }
  }

  async updateProduct(product) {
    try {
      const productMatched = await this.product.findOne({ _id: product.id });

      if (product.name) productMatched.name = product.name;
      if (product.color) productMatched.color = product.color;
      if (product.value) productMatched.value = product.value;
      await productMatched.save();
      return productMatched;
    } catch (error) {
      throw new Error('error in update');
    }
  }

  async showProduct() {
    try {
      return await this.product.find({});
    } catch (error) {
      throw new Error('error in list');
    }
  }
}
