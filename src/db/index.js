const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017';
const DB_NAME = process.env.DB_NAME || 'StoreManager';

let schema = null;

async function getConnectionAsync() {
    if (schema) {
        return Promise.resolve(schema);
    }

    return MongoClient.connect(
        MONGO_DB_URL,
        { useNewUrlParser: true, useUnifiedTopology: true },
    )
        .then((connection) => {
            schema = connection.db(DB_NAME);
            return schema;
        })
        .catch((err) => console.error(err));
}

module.exports = { getConnectionAsync };
