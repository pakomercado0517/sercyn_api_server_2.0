const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { Client } = require("../db");
const { sendMail, mailTemplate } = require("../config/mail.config");
const { generateToken } = require("../config/jwt.config");
const URL = "http://localhost:3001/sign_method/client";

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id, { user });
  });

  passport.deserializeUser(async (id, done) => {
    const user = await Client.findOne({ where: { id } });
    if (!user) return done(null, false);
    done(null, user);
  });

  // signUp

  passport.use(
    "local_client-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        userNamePassword: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const { first_name, last_name, photo, phone_number } = req.body;
        const client = await Client.findOne({ where: { email } });

        try {
          if (client)
            return done(null, false, { message: "El usario ya existe..." });
          const pass = await bcrypt.hash(password, 10);
          const mailToken = generateToken(email);
          const template = mailTemplate(mailToken, URL);
          await sendMail(email, template);

          const newClient = await Client.create({
            first_name,
            last_name,
            phone_number,
            email,
            photo,
            password: pass,
          });
          done(null, newClient);
        } catch (error) {
          done(null, error);
        }
      }
    )
  );

  //login

  passport.use(
    "local_client-login",
    new LocalStrategy(
      {
        usernameField: "email",
        userNamePassword: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const client = await Client.findOne({ where: { email } });
          const pass = await bcrypt.compare(password, client.password);
          if (!client)
            return done(null, false, {
              message: "Usuario no esta registrado...",
            });
          if (!pass)
            return done(null, false, { message: "Contraseña incorrecta..." });
          done(null, client);
        } catch (error) {
          done(null, error);
        }
      }
    )
  );
};
