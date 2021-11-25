const productsService = require('../services/product-service');

const OK_STATUS_CODE = 200;
const CREATED_STATUS_CODE = 201;
const UNPROCESSABLE_ENTITY_STATUS_CODE = 422;

async function getAllAsync(_, response) {
    const productsList = await productsService.getAllAsync();
    response.status(200).json({ products: productsList });
}

async function getByIdAsync(req, res) {
    const { id } = req.params;

    const productsList = await productsService.getByIdAsync(id);

    if (productsList.isInvalid) {
        return res.status(UNPROCESSABLE_ENTITY_STATUS_CODE).json({ err: productsList });
    }

    res.status(OK_STATUS_CODE).json(productsList);
}

async function createAsync(req, res) {
    const { name, quantity } = req.body;
    const addedProduct = await productsService.createAsync({
        name,
        quantity,
    });

    if (addedProduct.isInvalid) {
        return res.status(UNPROCESSABLE_ENTITY_STATUS_CODE).json({ err: addedProduct });
    }

    res.status(CREATED_STATUS_CODE).json(addedProduct);
}

async function updateAsync(req, res) {
    const { name, quantity } = req.body;
    const { id } = req.params;

    const updatedProduct = await productsService.updateAsync({ id, name, quantity });

    if (updatedProduct.isInvalid) {
        return res.status(UNPROCESSABLE_ENTITY_STATUS_CODE).json({ err: updatedProduct });
    }

    res.status(OK_STATUS_CODE).json(updatedProduct);
}

async function deleteAsync(req, res) {
    const { id } = req.params;
    const deletedProduct = await productsService.deleteAsync(id);

    if (deletedProduct.isInvalid) {
        return res.status(UNPROCESSABLE_ENTITY_STATUS_CODE).json({ err: deletedProduct });
    }

    res.status(OK_STATUS_CODE).json(deletedProduct);
}

module.exports = {
    getAllAsync,
    getByIdAsync,
    createAsync,
    updateAsync,
    deleteAsync,
};