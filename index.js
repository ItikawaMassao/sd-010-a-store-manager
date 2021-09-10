const express = require('express');
const bodyParser = require('body-parser');

const productController = require('./controllers/productController');

const app = express();
app.use(bodyParser.json());

const PORT = '3000';

app.post('/products', productController.create);

app.listen(PORT, () => {
  console.log('Servidor rodando');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
