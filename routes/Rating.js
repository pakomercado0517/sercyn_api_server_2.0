const { Router } = require("express");
const router = Router();
const RatingFunctions = require("../src/controllers/rating");

//POST methods
router.post("/:id", RatingFunctions.newRating);

//GET methods
router.get("/", RatingFunctions.getRating);
router.get("/bestRating", RatingFunctions.getByBestQaulification);
router.get("/getStars/:id", RatingFunctions.getStarsFromBoatId);
router.get("/getStars", RatingFunctions.getAllStarsFromBoat);

module.exports = router;
