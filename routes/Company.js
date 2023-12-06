const { Router } = require("express");
const router = Router();
const companyFunctions = require("../src/controllers/company");

// GET Methods
router.get("/", companyFunctions.getCompanies);

//POST methods
//PUT methods
router.put("/update/:id", companyFunctions.updateCompany);
//DELETE methods

module.exports = router;
