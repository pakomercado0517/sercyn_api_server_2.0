const { generateToken, generateAuthToken } = require("../config/jwt.config");
const { sendMail, mailTemplate } = require("../config/mail.config");

module.exports = {
  signup: async (data, db, url) => {
    const googleuser = await db.findOne({ where: { email: data.email } });
    if (googleuser) {
      res.status(400).json({ message: "Client already exists" });
    } else {
      const mailToken = generateToken(data.email);
      const template = mailTemplate(mailToken, url);
      await sendMail(data.email, template);

      const newGoogleUser = await db.create({
        ...data,
      });
      return newGoogleUser;
    }
  },
  login: async (data, db) => {
    const googleUser = await db.findOne({ where: { email: data.email } });
    console.log("data.email", data.email);
    const userForToken = {
      id: googleUser.id,
      email: googleUser.email,
    };
    const token = generateAuthToken(userForToken);
    return { token, googleUser };
  },
};
