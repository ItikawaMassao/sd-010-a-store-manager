const { ObjectId } = require('bson');
const getConnection = require('./connection');

const getAll = async () => {
  const db = await getConnection();
  const sales = await db.collection('sales').find({}).toArray();
  return sales;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sale;
};

const create = async (itensSold) => {
  const db = await getConnection();
  const result = await db.collection('sales').insertMany([{itensSold}]);
  return { _id: Object.values(result.insertedIds).toString(), 'itensSold': itensSold};
};

module.exports = {
  getAll,
  getById,
  create,
  // editById,
  // deleteById
};
