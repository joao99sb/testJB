import { Router } from 'express';
import { ProductController } from '../controllers/productController';

const router = Router();

const productController = new ProductController();

// Criar rotas para o CRUD de produto
router.route('/Product').post(productController.create);
router.route('/Product').get(productController.show);
router.route('/Product/:id').put(productController.update);
router.route('/Product/:id').delete(productController.remove);

// eslint-disable-next-line import/prefer-default-export
export { router };
