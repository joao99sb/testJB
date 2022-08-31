/* eslint-disable class-methods-use-this */
import { ProductRepository } from '../repositories/productRepository';

// eslint-disable-next-line import/prefer-default-export
export class ProductController {
  async create(req, res) {
    const { name, color, value } = req.body;

    try {
      const repo = new ProductRepository();
      const product = await repo.insertProduct({
        name,
        color,
        value,
      });

      return res.status(201).json({ ok: true, product });
    } catch (error) {
      return res.status(500).json({ ok: false, error: error.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, color, value } = req.body;

    try {
      const repo = new ProductRepository();
      const product = await repo.updateProduct({
        id,
        name,
        color,
        value,
      });

      return res.status(201).json({ ok: true, product });
    } catch (error) {
      return res.status(500).json({ ok: false, error: error.message });
    }
  }

  async remove(req, res) {
    const { id } = req.params;

    try {
      const repo = new ProductRepository();
      await repo.removeProduct(id);
      return res.status(204).json({ ok: true });
    } catch (error) {
      return res.status(500).json({ ok: false, error: error.message });
    }
  }

  async show(req, res) {
    try {
      const repo = new ProductRepository();
      const product = await repo.showProduct();

      return res.status(200).json({ ok: true, product });
    } catch (error) {
      return res.status(500).json({ ok: false, error: error.message });
    }
  }
}
