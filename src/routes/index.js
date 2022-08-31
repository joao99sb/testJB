const router = require('express').Router();

const {
  create, update, show, remove,
} = require('../controllers/productController');

// Criar rotas para o CRUD de produto
router.route('/Product').post(create);
router.route('/Product').get(show);
router.route('/Product/:id').put(update);
router.route('/Product/:id').delete(remove);

module.exports = router;
