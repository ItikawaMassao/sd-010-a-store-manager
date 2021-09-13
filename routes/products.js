const express = require('express');
const rescue = require('express-rescue');
const { isValidPayload, isValidId } = require('../middlewares/products');
const error = require('../middlewares/error');

const route = express.Router();

const Products = require('../controllers/products');

route.post('/', isValidPayload, rescue(Products.insertOne));
route.get('/:id', isValidId, rescue(Products.getProductById));
route.get('/', rescue(Products.getAllProducts));
route.put('/:id', isValidId, isValidPayload, rescue(Products.updateProduct));
route.delete('/:id', isValidId, rescue(Products.deleteProduct));
route.use(error);

module.exports = route;