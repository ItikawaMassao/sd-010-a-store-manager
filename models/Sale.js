const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (data) => {
  const db = await connection();

  const sales = await db.collection('sales').insertMany(
    [
      {
        itensSold: [
         ...data,
        ],
      }],
  );
  return {
    _id: sales.insertedIds[0],
    ...sales.ops[0],
  };
};

const getAllSales = async () => {
  const db = await connection();

  const sales = await db.collection('sales').find({}).toArray();

  return { sales };
 };
 
 const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const productData = await connection().then((db) =>
    db.collection('products').findOne(new ObjectId(id)));

  if (!productData) return null;

  return productData;
 };

module.exports = {
  create,
  getAllSales,
  findById,
};