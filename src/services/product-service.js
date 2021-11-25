const productsModel = require('../models/product-model');
const productValidator = require('../validations/product-validator');

const INVALID_DATA_CODE = 'invalid_data';

async function getAllAsync() {
    return productsModel.getAllAsync();
}

async function getByIdAsync(productId) {
    const productsList = await productsModel.getByIdAsync(productId);
    if (!productsList) {
        return {
            isInvalid: true,
            code: INVALID_DATA_CODE,
            message: 'Wrong id format',
        };
    }

    return productsList;
}

async function createAsync({ name, quantity }) {
    const productioValidationResult = productValidator.isValid(name, quantity);
    if (!productioValidationResult.isValid) {
        return {
            isInvalid: true,
            code: INVALID_DATA_CODE,
            message: productioValidationResult.message,
        };
    }

    const productExists = await productsModel.existsByNameAsync(name);
    if (productExists) {
        return {
            isInvalid: true,
            code: INVALID_DATA_CODE,
            message: 'Product already exists',
        };
    }

    return productsModel.createAsync({ name, quantity });
}

async function updateAsync({ id, name, quantity }) {
    const productioValidationResult = productValidator.isValid(name, quantity);
    if (!productioValidationResult.isValid) {
        return {
            isInvalid: true,
            code: INVALID_DATA_CODE,
            message: productioValidationResult.message,
        };
    }

    return productsModel.updateAsync({ id, name, quantity });
}

async function deleteAsync(productId) {
    const product = await getByIdAsync(productId);

    if (product.code) return product;

    const { _id } = await productsModel.deleteByIdAsync(productId);

    return {
        _id,
        name: product.name,
        quantity: product.quantity,
    };
}

module.exports = {
    getAllAsync,
    getByIdAsync,
    createAsync,
    updateAsync,
    deleteAsync,
};