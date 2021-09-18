const { ObjectId } = require('bson');
const conexao = require('./conexao');

const listarVendas = async () => {
  const db = await conexao();
  const vendas = await db.collection('sales').find({}).toArray();
  return { sales: vendas };
};

const listarVendaPorID = async (id) => {
  // Verificando se o id é válido
  if (!ObjectId.isValid(id)) return null;
  const db = await conexao();
  const venda = await db.collection('sales').findOne({ _id: ObjectId(id) });
  if (!venda) return false;
  return venda;
};

const criarVenda = async (itensVendidos) => {
  const db = await conexao();
  // const venda = await db.collection('sales').insertOne({ itensVendidos });
  const venda = await db.collection('sales').insertMany([{ itensSold: itensVendidos }]);
  // return venda.ops[0];
  return { _id: Object.values(venda.insertedIds).toString(), itensSold: itensVendidos };
};

const atualizarVenda = async (id, name, quantity) => {
  const db = await conexao();
  await db.collection('sales').updateOne(
    { _id: ObjectId(id) }, { $set: { name, quantity } },
  );
  return { _id: id, name, quantity };
};

const deletarVenda = async (id) => {
  // Verificando se o id é válido
  if (!ObjectId.isValid(id)) return null;
  const db = await conexao();
  const venda = await db.collection('sales').findOneAndDelete({ _id: ObjectId(id) });
  if (!venda) return false;
  return venda.value;
};

/* const buscarPeloID = async (id) => {
  const db = await conexao();
  const buscar = await db.collection('sales').findOne({ id });
  return buscar;
}; */

module.exports = {
  listarVendas,
  listarVendaPorID,
  criarVenda,
  atualizarVenda,
  deletarVenda,
};