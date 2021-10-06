const { MongoClient } = require('mongodb');

const OUTPUT = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://localhost:27017';
const DB_NAME = 'StoreManager';

const connection = () => MongoClient
  .connect(MONGO_DB_URL, OUTPUT)
  .then((conn) => conn.db(DB_NAME))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

module.exports = connection;