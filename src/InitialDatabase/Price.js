const { Price } = require("../db");

const prices = [
  //Precios Isla de Lobos...
  {
    price: 7500,
    BoatId: 1,
    DestinationId: 1,
  },
  {
    price: 7500,
    BoatId: 2,
    DestinationId: 1,
  },
  {
    price: 7000,
    BoatId: 3,
    DestinationId: 1,
  },
  {
    price: 7000,
    BoatId: 4,
    DestinationId: 1,
  },
  {
    price: 9000,
    BoatId: 5,
    DestinationId: 1,
  },
  //Precios Arrecifes coralinos...
  {
    price: 4200,
    BoatId: 1,
    DestinationId: 2,
  },
  {
    price: 4200,
    BoatId: 2,
    DestinationId: 2,
  },
  // {
  //   price: 4500,
  //   BoatId: 3,
  //   DestinationId: 2,
  // },
  // {
  //   price: 4500,
  //   BoatId: 4,
  //   DestinationId: 2,
  // },
  // {
  //   price: 6000,
  //   BoatId: 5,
  //   DestinationId: 2,
  // },
  //Precios Río Tuxpan
  {
    price: 3500,
    BoatId: 1,
    DestinationId: 3,
  },
];

const mapPrice = prices.map((el) => {
  return {
    price: el.price,
    BoatId: el.BoatId,
    DestinationId: el.DestinationId,
  };
});

const bulkPrice = async () => {
  await Price.bulkCreate(mapPrice);
  console.log("Price created with successfull");
};

module.exports = bulkPrice;
