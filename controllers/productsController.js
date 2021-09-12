const productsServices = require('../services/productsServices');
require('dotenv').config();

const getAll = async (_req, res, next) => {
  try {
    const products = await productsServices.getAll();
    return res.status(process.env.STATUS_200_OK).json({ products });
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsServices.getById(id);
    return res.status(process.env.STATUS_200_OK).json(...product);
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const createdProduct = await productsServices.create(name, quantity);
    return res.status(process.env.STATUS_201_CREATED).json(createdProduct);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  create,
};
