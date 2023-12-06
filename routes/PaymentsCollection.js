const { Router } = require("express");
const router = Router();
const collectionFunctions = require("../src/controllers/paymentsCollection");

// GET methods
router.get("/", collectionFunctions.getCollections);
router.get("/getCollection/:id", collectionFunctions.getCollectionById);
// POST methods
router.post("/addCollection", collectionFunctions.newCollection);
//PUT methods
router.put("/update/collection", collectionFunctions.updateCollection);
router.put(
  "/update/collection/status",
  collectionFunctions.updateCollectionStatus
);
// DELETE methods
router.delete("/delete/collection/:id", collectionFunctions.deleteCollection);

module.exports = router;
