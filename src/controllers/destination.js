const { Destination } = require("../db");

module.exports = {
  getDestinations: async (req, res) => {
    const destination = await Destination.findAll();
    res.status(200).json(destination);
  },
  getDestinationById: async (req, res) => {
    const { id } = req.params;
    try {
      const destination = await Destination.findOne({ where: { id } });
      res.status(200).json(destination);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  newDestination: async (req, res) => {
    const { name, image } = req.body;
    try {
      const findDestination = await Destination.findOne({ where: { name } });
      if (findDestination) {
        res.status(300).send("Destination exist on data base");
      } else {
        const newDestination = await Destination.create({ name, image });
        res
          .status(200)
          .json({ message: "Destination created", newDestination });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  // newDestination: async (req, res) => {
  //   const { name, image, price } = req.body;
  //   const { id } = req.params;
  //   const destination = await Destination.findOne({ where: { name } });
  //   const boat = await Boat.findOne({ where: { id } });
  //   const findDestination = await Destination.findOne({
  //     where: { name },
  //     include: {
  //       model: Price,
  //       include: { model: Boat },
  //     },
  //   });
  //   try {
  //     if (destination) {
  //       const result = findDestination.Prices[0].Boat.id;
  //       const idModified = parseInt(id);
  //       // console.log("findDestination", result);
  //       // console.log("id", result === idModified);
  //       if (findDestination.Prices[0].Boat.id === idModified) {
  //         res.status(300).send("Destination have exist...");
  //       } else {
  //         const newPrice = await Price.create({ price });
  //         // await boat.addDestinations(destination);
  //         await boat.addPrices(newPrice);
  //         await destination.addPrices(newPrice);
  //         res
  //           .status(200)
  //           .json({ message: "Destination assigned to boat...", newPrice });
  //       }
  //     } else {
  //       const newDestination = await Destination.create({ name, image });
  //       const newPrice = await Price.create({ price });
  //       // await boat.addDestinations(newDestination);
  //       await boat.addPrices(newPrice);
  //       await newDestination.addPrices(newPrice);
  //       res.status(200).json({
  //         message: "Destination created and assigned to boat",
  //         newDestination,
  //       });
  //     }
  //   } catch (error) {
  //     res.status(400).send(error);
  //   }
  // },
};
