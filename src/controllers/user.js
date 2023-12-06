const { User, Company, Boat, Price, Rating, BoatImage } = require("../db");

module.exports = {
  newUser: async (req, res) => {
    const {
      first_name,
      last_name,
      email,
      password,
      phone_number,
      companyName,
      logo,
      address,
    } = req.body;
    const userEmail = await User.findOne({ where: { email: email } });
    if (userEmail) {
      res.status(300).send("The User has been in use");
    } else {
      const newUser = await User.create({
        first_name,
        last_name,
        email,
        password,
        phone_number,
      });
      const newCompany = await Company.create({
        name: companyName,
        logo,
        address,
      });
      const userCreated = await newUser.setCompany(newCompany);
      res.status(200).json({ message: "User created", userCreated });
    }
  },

  getUsers: async (req, res) => {
    const user = await User.findAll({
      include: [
        {
          model: Company,
          include: [
            {
              model: Boat,
              include: [{ model: Price }, { model: Rating }],
            },
          ],
        },
      ],
    });
    res.status(200).json(user);
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findOne({
        where: { id },
        include: [
          {
            model: Company,
            include: [{ model: Boat, include: [{ model: BoatImage }] }],
          },
        ],
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  updateUser: async (req, res) => {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      companyId,
      companyName,
      logo,
      address,
    } = req.body;
    const { id } = req.params;

    try {
      const user = await User.findOne({
        where: { id },
        include: [{ model: Company }],
      });
      await user.update(
        {
          first_name,
          last_name,
          email,
          phone_number,
        },
        {
          where: { id },
        }
      );

      if (!user.Company) {
        const newCompany = await Company.create({
          companyName,
          logo,
          address,
        });
        await user.setCompany(newCompany);
        res.status(200).json({ data: user, message: "User updated" });
      } else {
        const company = await Company.findOne({ where: { id: companyId } });
        if (company) {
          await company.update({
            companyName,
            logo,
            address,
          });
          res.status(200).json({ data: user, message: "User updated" });
        }
      }
    } catch (error) {
      res
        .status(400)
        .json({ message: `Este error es de update User ${error.message}` });
    }
  },

  // tested: async (req, res) => {
  //   const https = require("https");
  //   await https.get("https://pokeapi.co/api/v2/pokemon", (res) => {
  //     res
  //       .on("data", (d) => {
  //         process.stdout.write(d);
  //       })
  //       .on("d", (data) => {
  //         console.log("data", data.results);
  //       });
  //   });
  // },
};
