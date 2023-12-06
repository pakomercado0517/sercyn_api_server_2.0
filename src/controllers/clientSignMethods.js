const { Client } = require("../db");
const bcrypt = require("bcrypt");
const { generateAuthToken, verifyToken } = require("../config/jwt.config");
const googleAuthFunctions = require("../utils/googleAuth");
const mailingFunctions = require("../utils/mailing");
const { BACK_HOST, FRONT_HOST } = process.env;
const URL = `${BACK_HOST}/sign_method/client`;

module.exports = {
  clientLogin: async (req, res, next) => {
    const { email } = req.body;
    try {
      const client = await Client.findOne({ where: { email } });

      const userForToken = {
        id: client.id,
        email: client.email,
      };

      const token = generateAuthToken(userForToken);

      res.send({
        message: "Logged",
        data: req.user,
        token,
        cookie: req.session,
      });
    } catch (error) {
      next(error);
    }
  },
  verifyLoginData: async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const client = await Client.findOne({ where: { email } });
      const passwordCorrect =
        client === null ? false : bcrypt.compare(password, client.password);

      if (!client) res.status(400).json({ message: "Client not found" });
      if (!passwordCorrect) res.status(400).json({ message: "Wrong password" });
      if (!client.status) res.status(400).json({ message: "email unverified" });
      return next();
    } catch (error) {
      next(error);
    }
  },
  googleSignup: async (req, res, next) => {
    const { email, first_name, last_name, photo, phone_number } = req.body;
    try {
      const newGoogleUser = await googleAuthFunctions.signup(
        { email, first_name, last_name, photo, phone_number },
        Client,
        URL
      );

      res
        .status(200)
        .json({ message: "googleUser created", data: newGoogleUser });
    } catch (error) {
      next(error);
    }
  },
  googleLogin: async (req, res, next) => {
    const { email } = req.body;
    try {
      const { token, googleUser } = await googleAuthFunctions.login(
        { email },
        Client
      );

      if (!googleUser) {
        res.status(404).json({ error: "Client not found" });
      } else if (!googleUser.status) {
        res.status(403).json({ error: "email unverified" });
      }

      res.status(200).json({
        message: "Logged",
        data: googleUser,
        token,
        session: req.session,
      });
    } catch (error) {
      console.log("error from googleLogin function", error);
      next(error);
    }
  },
  mailValidation: async (req, res, next) => {
    const { token } = req.params;
    try {
      const mailUserStatusUpdated = await mailingFunctions.validation(
        Client,
        token
      );
      if (!mailUserStatusUpdated) {
        res.status(404).json({ error: "Client not found" });
      } else {
        req.flash("success", "Email verificado con exito");
        res.redirect(`${FRONT_HOST}/mailVerified`);
      }
    } catch (error) {
      next(error);
    }
  },
};
