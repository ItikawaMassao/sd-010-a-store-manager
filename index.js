const express = require('express');
const bodyParser = require('body-parser');

const productsController = require('./controllers/productsControlers');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.getAll);
// app.get('/products/:id', productsController.getById);

app.post('/products', productsController.create);

const PORT = '3000';

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}!`);
});