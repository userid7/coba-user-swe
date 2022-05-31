const db = require("../db");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Create a User
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: 3,
  };
  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send({ status: "OK", message: "data created", data: data });
    })
    .catch((err) => {
      res.status(500).send({ status: "ERROR", message: err.message, data: "" });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const keyword = req.query.keyword;
  var condition = keyword
    ? {
        [Op.or]: [
          { name: { [Op.like]: `%${keyword}%` } },
          { email: { [Op.like]: `%${keyword}%` } },
        ],
      }
    : null;
  User.findAll({ where: condition })
    .then((data) => {
      res.send({ status: "OK", message: "", data: data });
    })
    .catch((err) => {
      res.status(500).send({ status: "ERROR", message: err.message, data: "" });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send({ status: "OK", message: "", data: data });
      } else {
        res.status(404).send({
          status: "ERROR",
          message: `Cannot find User with id=${id}.`,
          data: "",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ status: "ERROR", message: err.message, data: "" });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          status: "OK",
          message: "User was updated successfully.",
          data: id,
        });
      } else {
        res.send({
          status: "ERROR",
          message: "Nothing was updated.",
          data: id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "ERROR",
        message: "Error updating User with id=" + id,
        data: body,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          status: "OK",
          message: "User was deleted successfully!",
          data: "",
        });
      } else {
        res.send({
          status: "ERROR",
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
          data: "",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "ERROR",
        message: "Could not delete User with id=" + id,
        data: "",
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        status: "OK",
        message: `${nums} Tutorials were deleted successfully!`,
        data: "",
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: "ERROR",
        message:
          err.message || "Some error occurred while removing all tutorials.",
        data: "",
      });
    });
};
