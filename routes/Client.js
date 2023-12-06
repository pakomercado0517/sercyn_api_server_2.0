const { Router } = require("express");
const router = Router();
const clientFunctions = require("../src/controllers/client");
const clientExtractor = require("../src/middleware/clientExtractor");

//GET methods
router.get("/", clientFunctions.getClients);
router.get("/:id", clientExtractor, clientFunctions.getClientById);
router.get("/resetPassword/:token", clientFunctions.resetPasswordVerifyToken);
// POST methods
router.post("/recoveryPassword", clientFunctions.resetClientPassword);
//Put methods
router.put("/update/password", clientFunctions.updateClientPassword);
router.put("/update/:id", clientFunctions.updateClient);
router.put("/update/photo/:id", clientFunctions.updateClientPhoto);

module.exports = router;
