const { ObjectId } = require('mongodb');
const connection = require('../db');

const INDEX_NAME = 'products';

const getConnectionAsync = async () => connection.getConnectionAsync();

async function getAllAsync() {
  const db = await getConnectionAsync();
  return db.collection(INDEX_NAME).find().toArray();
}

async function getByNameAsync(productName) {
  const db = await getConnectionAsync();
  return db
    .collection(INDEX_NAME)
    .find({ name: productName }, {})
    .toArray();
}

async function existsByNameAsync(productName) {
  const productsList = await getByNameAsync(productName);
  return Array.isArray(productsList) && productsList.length;
}

async function getByIdAsync(productId) {
  if (!ObjectId.isValid(productId)) return null;

  const db = await getConnectionAsync();
  return db
    .collection(INDEX_NAME)
    .find({ _id: ObjectId(productId) })
    .toArray()[0];
}

async function createAsync({ name, quantity }) {
  const db = await getConnectionAsync();
  const { insertedId: _id } = await db.collection(INDEX_NAME).insertOne(
    { name, quantity },
  );

  return {
    _id,
    name,
    quantity,
  };
}

async function updateAsync({ id: productId, name, quantity }) {
  if (!ObjectId.isValid(productId)) return null;

  const db = await getConnectionAsync();
  await db.collection('products').updateOne(
    { _id: ObjectId(productId) },
    { $set: { name, quantity } },
  );

  return {
    _id: productId,
    name,
    quantity,
  };
}

async function deleteByIdAsync(productId) {
  if (!ObjectId.isValid(productId)) return null;

  const db = await getConnectionAsync();
  await db.collection('products').deleteOne(
    { _id: ObjectId(productId) },
  );

  return { _id: ObjectId(productId) };
}

module.exports = {
  getAllAsync,
  existsByNameAsync,
  getByNameAsync,
  getByIdAsync,
  createAsync,
  updateAsync,
  deleteByIdAsync,
};