const getConnection = require('./connection');

const create = async (name, quantity) => {
  const db = await getConnection();
  const findName = await db.collection('products').findOne({ name });
  if (findName) return { statusCode: 422 };
  const result = await db.collection('products').insertOne({ name, quantity });
  return { _id: result.insertedId, name, quantity };
};

module.exports = {
  create,
};
