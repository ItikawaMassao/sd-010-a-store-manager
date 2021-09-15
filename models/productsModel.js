// const { ObjectId } = require('bson');
const connection = require('./connection');

const getAll = async () => {
  const products = await connection().then((db) => db
    .collection('products').find({}, { sort: { title: 1 } }).toArray())
    .then((res) => res).catch((err) => console.log(err));
    return products;
};

const createProduct = async (name, quantity) => {
  console.log('model createProduct on!');
  const product = await connection().then((db) => db
  .collection('products').insertOne({ name, quantity }))
  .then(({ ops }) => ops[0]).catch((err) => console.log(err));
  return product;
};

const findByName = async (name) => {
  console.log('model findByName on!');
  const query = { name };
  const findProduct = await connection().then((db) => db
    .collection('products').findOne(query))
    .then((res) => {
      console.log(res);
      return res;
    }).catch((err) => console.log(err));
    return findProduct;
};

module.exports = {
  createProduct,
  getAll,
  findByName,
};