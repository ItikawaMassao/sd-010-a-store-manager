// Conectando a camada Services com a camada Models
const vendasModel = require('../models/vendasModel');

const listarVendaPorID = async (id) => {
  const venda = await vendasModel.listarVendaPorID(id);
  if (venda === false || venda === null) return 'não encontrado';
  return venda;
};

const criarVenda = async (itensVendidos) => {
  for (let index = 0; index < itensVendidos.length; index += 1) {
    // Validar que não é possível cadastrar vendas com quantidade menor ou igual a zero
    if (itensVendidos[index].quantity <= 0) return 'menor ou igual a zero';
    // Validar que não é possível cadastrar vendas com uma string no campo quantidade
    if (typeof itensVendidos[index].quantity !== 'number') return 'NaN';
  }

  const venda = await vendasModel.criarVenda(itensVendidos);
  return venda;
};

const atualizarVenda = async (id, name, quantity) => {
  // Validar que não é possível atualizar um produto com o nome menor que 5 caracteres
  if (name.length < 5) return 'menor que cinco';

  // Validar que não é possível atualizar um produto com quantidade menor ou igual a zero
  if (quantity <= 0) return 'menor ou igual a zero';

   // Validar que não é possível atualizar um produto com uma string no campo quantidade
   if (typeof quantity !== 'number') return 'NaN';

  const produto = await vendasModel.atualizarVenda(id, name, quantity);
  return produto;
};

const deletarVenda = async (id) => {
  const produto = await vendasModel.deletarVenda(id);
  if (produto === false || produto === null) return 'não encontrado';
  return produto;
};

module.exports = {
  criarVenda,
  listarVendaPorID,
  atualizarVenda,
  deletarVenda,
};