const express = require('express');
const bodyParser = require('body-parser');

const productRoutes = require('./Routes/products');
const { handleErrors } = require('./middlewares/errors');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRoutes);
app.use(handleErrors);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
