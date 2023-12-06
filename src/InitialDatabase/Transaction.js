const { Transaction } = require("../db");

const transactions = [
  {
    passenger: 8,
    status: "approved",
    date: "2023-06-25",
    price: 7500,
    BoatId: 1,
    ClientId: 2,
    DestinationId: 1,
  },
];

const mapTransactions = transactions.map((el) => {
  return {
    passenger: el.passenger,
    status: el.status,
    date: el.date,
    price: el.price,
    BoatId: el.BoatId,
    ClientId: el.ClientId,
    DestinationId: el.DestinationId,
  };
});

const bulkTransactions = async () => {
  await Transaction.bulkCreate(mapTransactions);
  console.log("Transactions created!");
};

module.exports = bulkTransactions;
