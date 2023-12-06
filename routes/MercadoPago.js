const { Router } = require("express");
const router = Router();
const mpFunctions = require("../src/controllers/mercadoPago");
const clientExtractor = require("../src/middleware/clientExtractor");

// POST methods
router.post("/checkout", clientExtractor, mpFunctions.newTransactions);

//GET methods

router.get("/checkout/response", mpFunctions.responseTransactions);

module.exports = router;
