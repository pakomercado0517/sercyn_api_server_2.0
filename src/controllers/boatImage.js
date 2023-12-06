const { Boat, BoatImage } = require("../db");

module.exports = {
  newImage: async (req, res, next) => {
    const { url } = req.body;
    const { id } = req.params;
    console.log("url", url);
    try {
      const boat = await Boat.findOne({ where: { id } });
      if (!boat)
        res
          .status(404)
          .json({ message: "No hay un bote registrado con ese ID" });
      const newImage = await BoatImage.create({ url });
      await boat.addBoatImages(newImage);
      res
        .status(200)
        .json({ message: "BoatImage created succesfully", newImage });
    } catch (error) {
      res.status(400).json({ message: error.message });
      next();
    }
  },
};
