const Products = require('../services/productsService');

const getAllProducts = async (_req, res) => {
  const { status, data } = await Products.getAllProducts();
  res.status(status).json({ products: data });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { status, data, message } = await Products.getProductById(id);
  if (message) return res.status(status).json({ err: { code: 'invalid_data', message } });
  res.status(status).json(data);
};

module.exports = { getAllProducts, getProductById }; 
