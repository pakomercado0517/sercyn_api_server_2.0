const { Client } = require("../db");

const clients = [
  {
    first_name: "Sissy",
    last_name: "Sánchez",
    email: "sissy@gmail.com",
    password: "abcdefg",
    phone_number: 123445654,
    photo:
      "https://imgv3.fotor.com/images/gallery/realistic-purple-hair-woman-avatar.jpg",
    city: "Tuxpan",
    state: "Veracruz",
    status: true,
  },
  {
    first_name: "Ayle",
    last_name: "Mercado",
    email: "sissyyayle0517@hotmail.com",
    password: "$2b$10$wDxfjCbgblEDvoMQ4yAbZ.bnsfp1ZbEeAN8dHl9kJVrlPlK0C.9UC",
    phone_number: 7831046697,
    photo:
      "https://ui-avatars.com/api/?name=Ayle+Mercado&background=1da2d8&color=fff&size=360",
    city: "Tuxpan",
    state: "Veracruz",
    status: true,
  },
];

const mapClients = clients.map((el) => {
  return {
    first_name: el.first_name,
    last_name: el.last_name,
    email: el.email,
    password: el.password,
    phone_number: el.phone_number,
    photo: el.photo,
    city: el.city,
    state: el.state,
    status: el.status,
  };
});

const bulkClients = async () => {
  await Client.bulkCreate(mapClients);
  console.log("Client created successfully");
};

module.exports = bulkClients;
