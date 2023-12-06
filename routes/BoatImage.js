const { Router } = require("express");
const router = Router();
const boatImageFunctions = require("../src/controllers/boatImage");

//POST mehtods
router.post("/newImage/:id", boatImageFunctions.newImage);

module.exports = router;
