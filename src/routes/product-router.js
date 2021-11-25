const express = require('express');
const controller = require('../controllers/product-controller');

const router = express.Router();

router.get('/', controller.getAllAsync);
router.post('/', controller.createAsync);

router.get('/:id', controller.getByIdAsync);
router.put('/:id', controller.updateAsync);

router.delete('/:id', controller.deleteAsync);

module.exports = router;