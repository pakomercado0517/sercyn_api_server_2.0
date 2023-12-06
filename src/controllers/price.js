const { Price, Destination, Boat, User, Company, Rating } = require("../db");
const boat = require("./boat");

module.exports = {
  newPrice: async (req, res, next) => {
    const { destinationId, boatId, price } = req.body;
    try {
      const destination = await Destination.findOne({
        where: { id: destinationId },
      });
      const boat = await Boat.findOne({ where: { id: boatId } });
      const newPrice = await Price.create({ price });
      await destination.addPrices(newPrice);
      await boat.addPrices(newPrice);

      res.status(200).json(newPrice);
    } catch (error) {
      res.status(400).json({ message: error.message });
      next(error);
    }
  },
  getPrices: async (req, res) => {
    try {
      const price = await Price.findAll({
        include: [
          { model: Destination },
          {
            model: Boat,
            include: [{ model: Company, include: [{ model: User }] }],
          },
        ],
      });
      res.status(200).json(price);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  getMoreExpensive: async (req, res) => {
    const { name } = req.query;
    try {
      if (name) {
        const filterPrice = await Price.findAll({
          include: [
            { model: Boat, include: [{ model: Rating }] },
            { model: Destination, where: { name } },
          ],
          order: [["price", "DESC"]],
        });
        res.status(200).json(filterPrice);
      } else {
        const allExpensivePrices = await Price.findAll({
          include: [
            { model: Destination },
            { model: Boat, include: [{ model: Rating }] },
          ],
          order: [["price", "DESC"]],
        });
        res.status(200).json(allExpensivePrices);
      }
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
  getMoreCheap: async (req, res) => {
    const { name } = req.query;
    try {
      if (name) {
        const filterPrice = await Price.findAll({
          include: [
            { model: Boat, include: [{ model: Rating }] },
            { model: Destination, where: { name } },
          ],
          order: [["price", "ASC"]],
        });
        res.status(200).json(filterPrice);
      } else {
        const allExpensivePrices = await Price.findAll({
          include: [
            { model: Destination },
            { model: Boat, include: [{ model: Rating }] },
          ],
          order: [["price", "ASC"]],
        });
        res.status(200).json(allExpensivePrices);
      }
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
  getPriceById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const price = await Price.findOne({
        where: { id },
        include: [{ model: Destination }, { model: Boat }],
      });
      res.status(200).json(price);
    } catch (error) {
      res.status(400).json({ message: error.message });
      next(error);
    }
  },
};
