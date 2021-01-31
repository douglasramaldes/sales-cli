const superagent = require("superagent");
const endpoint = "https://6015867c55dfbd00174ca575.mockapi.io/api/v1";

const addSale = async (sale) => {
  try {
    const res = await superagent.post(`${endpoint}/sale`).send(sale);
    console.log("---- Sale successfully inserted ----");
    await listSales();
  } catch (err) {
    console.error(err);
  }
};

const findSale = async (_id) => {
  try {
    const res = await superagent.get(`${endpoint}/sale/${_id}`);
    console.table(res.body);
  } catch (err) {
    console.error(err);
  }
};

const updateSale = async (_id, sale) => {
  try {
    const res = await superagent.put(`${endpoint}/sale/${_id}`).send(sale);
    console.log("---- Sale successfully updated ----");
    await listSales();
  } catch (err) {
    console.error(err);
  }
};

const removeSale = async (_id) => {
  try {
    const res = await superagent.delete(`${endpoint}/sale/${_id}`);
    console.log("---- Sale successfully removed ----");
    await listSales();
  } catch (err) {
    console.error(err);
  }
};

const listSales = async () => {
  try {
    const res = await superagent.get(`${endpoint}/sale`);
    console.log("---- Sales ----");
    console.table(res.body);
    listRanking(res.body);
  } catch (err) {
    console.error(err);
  }
};

const addSeller = async (seller) => {
  try {
    const res = await superagent.post(`${endpoint}/sellers`).send(seller);
    console.log("---- Seller successfully inserted ----");
    const sellers = await listSellers();
    console.table(sellers);
  } catch (err) {
    console.error(err);
  }
};

const listSellers = async () => {
  try {
    const res = await superagent.get(`${endpoint}/sellers`);
    let sellers = [];
    return res.body;
  } catch (err) {
    console.error(err);
  }
};

const listRanking = async (sales) => {
  const result = Object.values(
    sales.reduce(
      (sale, i) => (
        sale[i.sellerName]
          ? (sale[i.sellerName].saleValue += i.saleValue)
          : (sale[i.sellerName] = { ...i }),
        sale
      ),
      {}
    )
  );

  const ranking = result.map((obj) => ({
    sellerName: obj.sellerName,
    amountSold: obj.saleValue,
  }));

  ranking.sort((x, y) => {
    return y.amountSold - x.amountSold;
  });
  console.log("---- Sales Ranking ----");
  console.table(ranking);
};

module.exports = {
  addSeller,
  addSale,
  findSale,
  updateSale,
  removeSale,
  listSales,
  listSellers,
};
