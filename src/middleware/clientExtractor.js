const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const authorization = req.get("authorization");
  let token = "";

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  const decodeToken = jwt.verify(token, JWT_SECRET);

  if (!token || !decodeToken.id) {
    return res.status(401).json({ message: "token missing or invalid" });
  }
  const { id: clientId } = decodeToken;

  req.clientId = clientId;

  next();
};
