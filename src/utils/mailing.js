const { verifyToken } = require("../config/jwt.config");

module.exports = {
  validation: async (db, token) => {
    const emailDecoded = verifyToken(token);
    const mailUser = await db.findOne({ where: { email: emailDecoded.data } });
    const mailUserStatusUpdated = await mailUser.update({ status: true });
    console.log("mail verified");
    return mailUserStatusUpdated;
  },
};
