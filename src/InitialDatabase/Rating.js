const { Rating } = require("../db");

const ratings = [
  {
    condition_qualification: 10,
    destination_qualification: 10,
    global_qualification: 10,
    operator_qualification: 10,
    stars: 5,
    comment:
      "Excelente servicio, muy profesionales, dedicados y te ofrecen una super experiencia. Realmente me encanto la embarcación y el ambiente de la tripulación.",
    clientId: 1,
    boatId: 1,
  },
  {
    condition_qualification: 10,
    destination_qualification: 10,
    global_qualification: 10,
    operator_qualification: 10,
    stars: 5,
    comment:
      "Me encantó el servicio! Realmente piensas que eres Batman a toda velocidad, una experiencian inolvidable. Lo recomiendo al 1000%",
    clientId: 2,
    boatId: 3,
  },
  {
    condition_qualification: 10,
    destination_qualification: 10,
    global_qualification: 10,
    operator_qualification: 10,
    stars: 5,
    comment:
      "Me encantó el servicio! Realmente piensas que eres Batman a toda velocidad, una experiencian inolvidable. Lo recomiendo al 1000%",
    clientId: 2,
    boatId: 3,
  },
  {
    condition_qualification: 10,
    destination_qualification: 10,
    global_qualification: 10,
    operator_qualification: 10,
    stars: 5,
    comment:
      "Me encantó el servicio! Realmente piensas que eres Batman a toda velocidad, una experiencian inolvidable. Lo recomiendo al 1000%",
    clientId: 2,
    boatId: 3,
  },
];

const mapRatings = ratings.map((el) => {
  return {
    condition_qualification: el.condition_qualification,
    destination_qualification: el.destination_qualification,
    global_qualification: el.global_qualification,
    operator_qualification: el.operator_qualification,
    stars: el.stars,
    comment: el.comment,
    ClientId: el.clientId,
    BoatId: el.boatId,
  };
});

const bulkRatings = async () => {
  await Rating.bulkCreate(mapRatings);
  console.log("Ratings created successfully");
};

module.exports = bulkRatings;
