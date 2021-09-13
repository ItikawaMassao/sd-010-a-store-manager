const express = require('express');
const productController = require('../controllers/products');
const { validateNewProduct } = require('../middlewares/products');

const router = express.Router();

router.post('/', validateNewProduct, productController.addNew);

router.get('/:id', productController.getById);

router.get('/', productController.getAll);

router.put('/:id', validateNewProduct, productController.updateOne);

router.delete('/:id', productController.deleteOne);

module.exports = router;
