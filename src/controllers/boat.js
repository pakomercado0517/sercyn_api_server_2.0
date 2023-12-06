const Sequelize = require("sequelize");
const ratingFunctions = require("./rating");
const {
  User,
  Boat,
  Company,
  Price,
  Destination,
  Rating,
  BoatImage,
} = require("../db");

module.exports = {
  newBoat: async (req, res, next) => {
    const { id } = req.params;
    const { name, photo, capacity } = req.body;
    const company = await Company.findOne({ where: { id: id } });
    try {
      const boat = await Boat.findOne({ where: { name } });
      if (boat) {
        res.status(300).send("The Boat has been registered before");
      } else {
        const newBoat = await Boat.create({
          name,
          photo,
          capacity,
        });
        await company.addBoats(newBoat);
        res.status(200).json({ message: "Boat created on database", newBoat });
      }
    } catch (error) {
      res.status(400).send(error);
      next();
    }
  },
  getAllBoats: async (req, res) => {
    try {
      const getBoats = await Boat.findAll({
        include: [{ model: Price }, { model: Rating }, { model: BoatImage }],
        // attributes: {
        //   include: [
        //     [Sequelize.fn("SUM", Sequelize.col("rating.stars")), "totalStars"],
        //   ],
        // },
        // group: [Boat.id],
      });
      res.status(200).json(getBoats);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getByAscName: async (req, res, next) => {
    try {
      const ascName = await Boat.findAll({
        order: [["name", "ASC"]],
        include: [{ model: Rating }],
      });
      res.status(200).json(ascName);
    } catch (error) {
      res.stataus(400).json({ message: error.message });
      next();
    }
  },
  getByDescName: async (req, res, next) => {
    try {
      const ascName = await Boat.findAll({
        order: [["name", "DESC"]],
        include: [{ model: Rating }],
      });
      res.status(200).json(ascName);
    } catch (error) {
      res.stataus(400).json({ message: error.message });
      next();
    }
  },
  getByDestination: async (req, res, next) => {
    try {
      const { name } = req.query;
      const destinationName = await Price.findAll({
        include: [
          { model: Destination, where: { name } },
          { model: Boat, include: [{ model: Rating }] },
        ],
      });
      res.status(200).json(destinationName);
    } catch (error) {
      res.status(400).json({ message: error.message });
      next();
    }
  },
  getById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const findedBoat = await Boat.findOne({
        where: { id },
        include: [
          { model: Company },
          { model: Rating },
          { model: BoatImage },
          { model: Price, include: [{ model: Destination }] },
        ],
      });
      res.status(200).json(findedBoat);
    } catch (error) {
      res.status(400).json({ message: error.message });
      next();
    }
  },
  updateBoat: async (req, res, next) => {
    const { id } = req.params;
    const { name, photo, capacity } = req.body;
    try {
      const boat = await Boat.findOne({ where: { id } });
      if (!boat) res.status(404).json({ message: "Boat not finded on BD" });
      await boat.update({ name, photo, capacity });
      res.status(200).json(boat);
    } catch (error) {
      res.status(400).json({ message: error.message });
      next(error);
    }
  },
  deleteBoat: async (req, res, next) => {
    const { id } = req.params;
    try {
      const boat = await Boat.findOne({ where: { id } });
      await boat.destroy();
      res.status(200).json({ message: "Boat deleted" });
    } catch (error) {
      next(error);
    }
  },
};
