const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controller/productController');
const saleController = require('./controller/saleController');
const validationNameAndQuantity = require('./middlewares/validateProducts');
const validationIDAndQuantity = require('./middlewares/validateSales');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', validationNameAndQuantity, productController.create);
app.get('/products/:id', productController.getById);
app.get('/products', productController.getAll);
app.put('/products/:id', validationNameAndQuantity, productController.update);
app.delete('/products/:id', productController.exclude);
app.post('/sales', validationIDAndQuantity, saleController.create);

app.listen(3000, () => console.log('Olha noix ai na porta 3000'));