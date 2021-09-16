const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const productController = require('./controllers/productController');
const { validName, validQuantity } = require('./middlewares/productMiddleware');

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', validName, validQuantity, productController.create);

app.listen(PORT, () => {
  console.log('Listening to port', PORT);
});
