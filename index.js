const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const { products, sales } = require('./controllers/index');
const { errorMiddleware } = require('./middlewares/errorMiddleware');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/products', rescue(products.createProduct));
app.post('/sales', sales.createSale);

app.use(errorMiddleware);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log('Here we go!!'));
