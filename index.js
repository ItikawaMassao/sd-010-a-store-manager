const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', productController.createProduct);
app.get('/products', productController.getAllProducts);
app.get('/products/:id', productController.getProductById);

app.listen(PORT, () => {
  console.log('Online em:', PORT);
});