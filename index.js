const express = require('express');
const BodyParser = require('body-parser');
const Products = require('./controllers/productsController');
const Validator = require('./middlewares/validations');

const PORT = 3000;
const app = express();
app.use(BodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', Validator.validName, Validator.validQuantityProducts, Products.createProduct);
app.get('/products', Products.getAllProducts);
app.get('/products/:id', Products.getProductById);

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
