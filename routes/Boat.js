const { Router } = require("express");
const router = Router();
const boatFunctions = require("../src/controllers/boat");

//GET Methods
router.get("/", boatFunctions.getAllBoats);
router.get("/ascendingName", boatFunctions.getByAscName);
router.get("/descendingName", boatFunctions.getByDescName);
router.get("/destinations", boatFunctions.getByDestination);
router.get("/:id", boatFunctions.getById);
//POST Methods
router.post("/:id", boatFunctions.newBoat);
//PUT Methods
router.put("/update/:id", boatFunctions.updateBoat);
//DELETE Methods
router.delete("/delete/:id", boatFunctions.deleteBoat);
module.exports = router;
