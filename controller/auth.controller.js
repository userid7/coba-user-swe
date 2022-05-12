var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const db = require("../db");
const config = require("../config/auth.config");

const User = db.users;
const Role = db.role;
const Op = db.Sequelize.Op;

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ status: "ERROR", message: "User Not found.", data: "" });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          status: "ERROR",
          message: "Invalid Password!",
        });
      }
      var tokenDuration = 60 * 5;
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: tokenDuration, // 24 hours
      });
      res.status(200).send({
        status: "OK",
        message: "Login success",
        data: { token: token, expDateTime: Date.now() + tokenDuration },
      });
    })
    .catch((err) => {
      res.status(500).send({ status: "ERROR", message: err.message, data: "" });
    });
};

exports.logout = (req, res) => {};
