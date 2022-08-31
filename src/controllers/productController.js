const {
  insertProduct,
  removeProduct,
  updateProduct,
  showProduct,
} = require('../repositories/productRepository');

const create = async (req, res) => {
  const { name, color, value } = req.body;

  try {
    const product = await insertProduct({
      name,
      color,
      value,
    });

    return res.status(201).json({ ok: true, product });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
};

const update = async (req, res) => {
  const {
    id, name, color, value,
  } = req.body;

  try {
    const product = await updateProduct({
      id,
      name,
      color,
      value,
    });

    return res.status(201).json({ ok: true, product });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
};

const remove = async (req, res) => {
  const { id } = req.body;

  try {
    await removeProduct(id);
    return res.status(204).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
};

const show = async (req, res) => {
  try {
    const product = await showProduct();

    return res.status(201).json({ ok: true, product });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
};

module.exports = {
  create,
  update,
  remove,
  show,
};
