const salesModels = require('../models/salesModels');

const getAll = async () => {
  try {
    const sales = await salesModels.getAll();
    return sales;
  } catch (error) {
    return ({ message: error.message });
  }
};

const getById = async (id) => {
  try {
  const sales = await salesModels.getById(id);
  return sales;
  } catch (error) {
    return ({ message: error.message });
  }
};

const getByName = async (wantedName) => {
  const products = await salesModels.getByName(wantedName);
  if (!products) { return undefined; }
  return products;
};

const create = async (itensSold) => {
  const insertedProduct = await salesModels.create(itensSold);
  return insertedProduct;
};

const update = async (id, itensSold) => {
  const updatedProduct = await salesModels.update(id, itensSold);
  return updatedProduct;
};

const remove = async (id) => {
  const removedProduct = await salesModels.remove(id);
  return removedProduct;
};

module.exports = { getAll, getById, getByName, create, update, remove };