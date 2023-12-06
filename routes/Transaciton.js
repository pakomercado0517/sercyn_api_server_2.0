const { Router } = require("express");
const router = Router();
const transactionFunctions = require("../src/controllers/transaction");

//POST methods
router.post("/:id", transactionFunctions.newTransaction);
//GET methods
router.get("/", transactionFunctions.getTransactions);
router.get("/company/:id", transactionFunctions.findTransactionByCompany);
router.get("/:id", transactionFunctions.getTransactionById);
// PUT methods
router.put("/update/:id", transactionFunctions.updateTransaction);
// DELETE methods
router.delete("/delete/:id", transactionFunctions.deleteTransaction);
module.exports = router;
