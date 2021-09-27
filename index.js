const express = require('express');
const dotEnv = require('dotenv');
const bodyParser = require('body-parser');
const dbConnection = require('./model/connection');

const app = express();
dotEnv.config();
dbConnection();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
