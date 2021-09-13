const { ObjectId } = require('bson');
const connection = require('./connection');
const productModel = require('./productModel');

const getAll = async () => {
  const sales = await connection().then((db) => db
  .collection('sales').find({}).toArray())
  .catch((err) => console.log(err));
  return sales;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const sale = await connection().then((db) => db
  .collection('sales').findOne({ _id: ObjectId(id) }))
  .then((res) => res).catch((error) => console.log(error));

  return sale;
};

const updateProductStock = async (productId, quantity) => {
  const db = await connection();
  
  await db.collection('products').findOneAndUpdate({
    _id: ObjectId(productId) }, { $inc: { quantity: -quantity } });
};

// const updateProductStockOnSaleDelete = async (productId, quantity) => {
//   const db = await connection();
//   await db.collection('products').findOneAndUpdate({
//     _id: ObjectId(productId) }, { $inc: { quantity: +quantity } });
// };

const create = async (items) => {
  console.log(items, 'salesModel');

  const db = await connection();
  const newSale = await db.collection('sales').insertMany([{ itensSold: items }]);
  items.forEach(async ({ productId, quantity }) => {
    await updateProductStock(productId, quantity);
  });

  return {
    _id: Object.values(newSale.insertedIds).toString(),
    itensSold: items,
  };
};

const update = async (id, itensSold) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  await connection().then((db) => db
  .collection('sales').findOneAndUpdate({
    _id: new ObjectId(id) }, { $set: { itensSold } }))
  .catch((err) => console.log(err));

  const getItemsById = await getById(id);
  return getItemsById;
};

const updateStock = async (productId, amount) => {
  const { quantity, name } = await productModel.getById(productId);
  const newQuantity = quantity + amount;
  await productModel.update(productId, name, newQuantity);
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();
  const { itensSold } = await getById(id);

  itensSold.forEach(async ({ productId, quantity }) => {
    // updateStock(productId, quantity);
    await updateStock(productId, quantity);
  });

  const removeSale = await db.collection('sales').deleteOne({ _id: ObjectId(id) });

  return removeSale;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
