const { Op, Sequelize } = require("sequelize");
const { Rating, Boat, Client } = require("../db");

module.exports = {
  getRating: async (req, res) => {
    try {
      const allRatings = await Rating.findAll({
        include: [{ model: Boat }, { model: Client }],
      });
      res.status(200).json(allRatings);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getByBestQaulification: async (req, res) => {
    try {
      const rating = await Rating.findAll({
        where: {
          qualification: {
            [Op.between]: [4, 5],
          },
        },
        include: [{ model: Boat }, { model: Client }],
        order: [["id", "DESC"]],
      });
      res.status(200).json(rating);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  newRating: async (req, res) => {
    const {
      condition_qualification,
      destination_qualification,
      global_qualification,
      operator_qualification,
      stars,
      comment,
      clientId,
    } = req.body;
    const { id } = req.params;
    try {
      const boat = await Boat.findOne({
        where: { id },
      });
      const client = await Client.findOne({ where: { id: clientId } });
      const newRating = await Rating.create({
        condition_qualification,
        destination_qualification,
        global_qualification,
        operator_qualification,
        stars,
        comment,
      });
      await boat.addRatings(newRating);
      await client.addRatings(newRating);
      res.status(200).json({ message: "Rating created", newRating });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getStarsFromBoatId: async (req, res) => {
    const { id } = req.params;
    try {
      const stars = await Rating.sum("stars", {
        where: { BoatId: { [Op.eq]: id } },
      });
      const { count } = await Rating.findAndCountAll({
        where: { BoatId: { [Op.eq]: id } },
      });
      res.status(200).json({ stars, count, BoatId: id });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  getAllStarsFromBoat: async (req, res) => {
    try {
      // const stars = await Rating.sum("stars", {});
      // const { count, rows = Sequelize.fn("SUM", "stars") } =
      //   await Rating.findAndCountAll({});
      // res.status(200).json({ stars, count, rows });
      const counterStars = await Rating.findAll({
        attributes: ["BoatId", [Sequelize.literal("COUNT(*)"), "count"]],
        group: ["BoatId"],
      });
      const $stars = await Rating.sum("stars");
      res.status(200).json({ counterStars, $stars });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
