const { Op } = require("sequelize");
const { Company, Boat } = require("../db");

module.exports = {
  getCompanies: async (req, res) => {
    const company = await Company.findAll();
    res.status(200).json(company);
  },
  updateCompany: async (req, res) => {
    const { id } = req.params;
    const { companyName, logo, address } = req.body;
    try {
      const company = await Company.update(
        {
          companyName,
          logo,
          address,
        },
        { where: { id } }
      );
      res.status(200).json(company);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};
