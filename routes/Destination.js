const { Router } = require("express");
const router = Router();
const destinationFunction = require("../src/controllers/destination");

//GET methods
router.get("/", destinationFunction.getDestinations);
router.get("/:id", destinationFunction.getDestinationById);

//POST methods
router.post("/:name", destinationFunction.newDestination);

module.exports = router;
