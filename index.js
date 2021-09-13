const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const productController = require('./controllers/productController');

const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productController.create);

app.listen(PORT, () => {
  console.log(`Online na porta ${PORT}`);
});
