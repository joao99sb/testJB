const router = require('express').Router();

const {
  create, update, show, remove,
} = require('../controllers/productController');

// Criar rotas para o CRUD de produto
router.route('/Product').post(create);
router.route('/Product').get(show);
router.route('/Product/update').put(update);
router.route('/Product/delete').delete(remove);

module.exports = router;
