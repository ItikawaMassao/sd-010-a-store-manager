const express = require('express');

const router = express.Router();
const productController = require('../controllers/productController');
const productMiddleware = require('../midllewares/productMiddleware');
const salesController = require('../controllers/salesController');
const salesMidllewares = require('../midllewares/salesMidlleware');

router.get('/products/:id', productController.findOneProduct);
router.get('/products', productController.findAllProducts);
router.post(
  '/products',
  productMiddleware.validate,
  productController.createProduct,
);
router.put(
  '/products/:id',
  productMiddleware.validate,
  productController.updateProduct,
);

router.delete('/products/:id', productController.deleteProduct);

router.post('/sales', salesMidllewares.validateSale, salesController.create);

router.get('/sales/:id', salesController.findById);
router.get('/sales', salesController.findSales);

router.put('/sales/:id', salesMidllewares.validateSale, salesController.update);
router.delete('/sales/:id', salesController.deleteSold);

module.exports = router;
