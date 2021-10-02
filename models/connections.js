const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongo://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';
const OPTIONS = { newUrlParser: true, unifiedTopology: true };

module.exports = () =>
  MongoClient.connect(MONGO_DB_URL, OPTIONS)
    .then((connection) => connection.db(DB_NAME))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
