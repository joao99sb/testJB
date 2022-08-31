const { Product } = require('../schema/productSchema');

const insertProduct = async (product) => {
  if (!product.name || !product.color || !product.value) {
    throw new Error('invalid data');
  }
  return Product.create(product);
};

const removeProduct = async (id) => {
  try {
    await Product.deleteOne({ _id: id });
    const productCheck = await Product.countDocuments({ _id: id });
    if (productCheck !== 0) throw new Error('error in delete');
  } catch (error) {
    throw new Error('error in delete');
  }
};

const updateProduct = async (product) => {
  try {
    const productMatched = await Product.findOne({ _id: product.id });

    if (product.name) productMatched.name = product.name;
    if (product.color) productMatched.color = product.color;
    if (product.value) productMatched.value = product.value;
    await productMatched.save();
    return productMatched;
  } catch (error) {
    throw new Error('error in update');
  }
};
const showProduct = async () => {
  try {
    return await Product.find({});
  } catch (error) {
    throw new Error('error in list');
  }
};

module.exports = {
  insertProduct,
  removeProduct,
  updateProduct,
  showProduct,
};
