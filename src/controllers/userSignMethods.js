const jwt = require("jsonwebtoken");
const { User } = require("../db");
const bcrypt = require("bcrypt");
const {
  generateAuthToken,
  generateToken,
  verifyToken,
} = require("../config/jwt.config");
const URL = "http://localhost:3001/user/mail";
const mailingFunctions = require("../utils/mailing");
const googleAuthFunctions = require("../utils/googleAuth");

module.exports = {
  userLogin: async (req, res, next) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ where: { email } });

      const userForToken = {
        id: user.id,
        email: user.email,
      };

      const token = generateAuthToken(userForToken);

      res.status(200).json({
        message: "User Logged",
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
      const user = await User.findOne({ where: { email } });
      const passwordCorrect =
        user === null ? false : bcrypt.compare(password, user.password);

      if (!user) res.status(401).json({ message: "Client not found" });
      if (!passwordCorrect) res.status(401).json({ message: "Wrong password" });
      if (!user.status) res.status(403).json({ message: "email unverified" });
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
        User,
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
        User
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
    const PATH_URL = "http://localhost:3002";
    try {
      const mailUserStatusUpdated = await mailingFunctions.validation(
        User,
        token
      );
      if (!mailUserStatusUpdated) {
        res.status(404).json({ error: "Client not found" });
      } else {
        req.flash("success", "Email verificado con exito");
        res.redirect(`${PATH_URL}/mailVerified`);
      }
    } catch (error) {
      next(error);
    }
  },
};
