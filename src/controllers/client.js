const {
  Client,
  Transaction,
  Boat,
  Destination,
  Company,
  PaymentsCollection,
} = require("../db");
const {
  sendEmail,
  mailTemplate,
} = require("../config/mailResetPassword.config");
const { generateToken, verifyToken } = require("../config/jwt.config");
const bcrypt = require("bcrypt");

module.exports = {
  getClients: async (req, res) => {
    const getClients = await Client.findAll();
    console.log("cookies", req.session);
    res.status(200).json(getClients);
  },
  newClient: async (req, res, next) => {
    const {
      first_name,
      last_name,
      email,
      photo,
      password,
      phone_number,
      city,
      state,
    } = req.body;
    try {
      const searchClient = await Client.findOne({ where: { email } });
      if (searchClient) {
        res.status(300).send("The user has been registered");
      } else {
        const mailToken = generateToken(email);
        const template = mailTemplate(mailToken);

        await sendMail(email, template);
        const newClient = await Client.create({
          first_name,
          last_name,
          photo,
          email,
          password,
          phone_number,
          city,
          state,
        });
        res.status(200).json(newClient);
      }
    } catch (error) {
      res.status(400).send(error);
      next();
    }
  },
  getClientById: async (req, res, next) => {
    const { id } = req.params;

    try {
      const client = await Client.findOne({
        where: { id },
        include: [
          {
            model: Transaction,
            include: [
              { model: Boat, include: [{ model: Company }] },
              { model: Destination },
            ],
          },
        ],
        order: [[Transaction, "id", "DESC"]],
      });
      res.status(200).json(client);
    } catch (error) {
      res.status(400).send(error.message);
      next();
    }
  },
  updateClient: async (req, res, next) => {
    const {
      first_name,
      last_name,
      email,
      photo,
      password,
      phone_number,
      city,
      state,
    } = req.body;
    const { id } = req.params;
    try {
      const client = await Client.findOne({ where: { id } });
      if (client) {
        await client.update({
          first_name,
          last_name,
          email,
          photo,
          password,
          phone_number,
          city,
          state,
        });
        res.status(200).json(client);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
      next();
    }
  },
  updateClientPhoto: async (req, res, next) => {
    const { id } = req.params;
    const { photo } = req.body;
    try {
      const client = await Client.findOne({ where: { id } });
      if (client) {
        await client.update({ ...client, photo });
        res.status(200).json(client);
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
      next();
    }
  },
  updateClientPassword: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const client = await Client.findOne({ where: { email } });
      const pass = await bcrypt.hash(password, 10);
      if (!client) res.status(401).send({ message: "Client not found" });
      await client.update({ ...client, password: pass });
      res.status(200).json(client);
    } catch (error) {
      console.log("error from update password", error);
    }
  },
  resetClientPassword: async (req, res, next) => {
    const { email } = req.body;
    try {
      const client = await Client.findOne({ where: { email } });
      if (!client) {
        res.status(401).send({ message: "Client not found" });
      }
      const mailToken = generateToken(email);
      const template = mailTemplate(mailToken);
      await sendEmail(email, template);
      res.status(200).json({ message: "Mail sent successfully" });
    } catch (error) {
      next(error);
    }
  },
  resetPasswordVerifyToken: async (req, res, next) => {
    const { token } = req.params;
    try {
      const clientToken = verifyToken(token);
      console.log("clientToken", clientToken);
      if (!clientToken) {
        res.status(500).json({ message: "Invalid token" });
      }
      res
        .status(200)
        .redirect(`http://localhost:5173/${clientToken.data}/resetPassword`);
    } catch (error) {
      next(error);
    }
  },
};
