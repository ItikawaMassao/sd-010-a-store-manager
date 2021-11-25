const express = require('express');
const bodyParser = require('body-parser');
const productRouter = require('./src/routes/product-router');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);

app.listen(PORT, () => console.info(`Server running on port ${PORT}`));