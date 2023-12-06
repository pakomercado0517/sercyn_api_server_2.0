const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

function generateToken(client) {
  return jwt.sign(
    {
      data: client,
    },
    JWT_SECRET,
    { expiresIn: "2h" }
  );
}

function verifyToken(token) {
  let data = null;
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) console.log("Error al obtener la data del token", err);
    data = decoded;
  });
  return data;
}

function generateAuthToken(payload) {
  let token = null;
  token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: 60 * 60 * 24 * 2,
    // expiresIn: "1m",
  });
  return token;
}

module.exports = { generateToken, verifyToken, generateAuthToken };
