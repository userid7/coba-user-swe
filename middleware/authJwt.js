const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../db");
const User = db.users;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      status: "ERROR",
      message: "No token provided!",
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        status: "ERROR",
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken: verifyToken,
};

module.exports = authJwt;
