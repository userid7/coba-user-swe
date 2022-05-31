var validator = require("email-validator");
const { writeFile, readFile } = require("../component/file");
const bcrypt = require("bcrypt");

var jsonDb = [];
jsonDb = readFile();

// Create and Save a new User
exports.create = (req, res) => {
  // Create a User
  if (!validator.validate(req.body.email)) {
    return res.status(500).send({
      status: "ERROR",
      message: "email not valid",
      data: "",
    });
  }

  const user = {
    id: jsonDb.length,
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    role: 3,
  };

  var isEmailUsed = false;

  jsonDb.forEach((element) => {
    if (element.email === user.email) {
      isEmailUsed = true;
    }
  });

  if (isEmailUsed) {
    return res.status(500).send({
      status: "ERROR",
      message: "email has been used",
    });
  }

  console.log("CREATE JSON DATA");
  jsonDb.push(user);
  //   jsonDb.write();
  writeFile(jsonDb);

  res.send({ status: "OK", message: "data created", data: user });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  jsonDb = readFile();

  res.send({ status: "OK", message: "", data: jsonDb });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  if (id >= jsonDb.length) {
    return res.status(404).send({
      status: "ERROR",
      message: `Cannot find User with id=${id}.`,
      data: "",
    });
  }

  //   jsonDb = readFile();
  res.send({ status: "OK", message: "", data: jsonDb[id] });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  if (id >= jsonDb.length) {
    return res.status(404).send({
      status: "ERROR",
      message: `Cannot find User with id=${id}.`,
      data: "",
    });
  }

  if (!validator.validate(req.body.email)) {
    return res.status(500).send({
      status: "ERROR",
      message: "email not valid",
    });
  }

  const user = {
    id: id,
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    role: 3,
  };

  var isEmailUsed = false;

  jsonDb.forEach((element) => {
    if (element.email === user.email && element.id !== user.id) {
      isEmailUsed = true;
    }
  });

  if (isEmailUsed) {
    return res.status(500).send({
      status: "ERROR",
      message: "email has been used",
    });
  }

  console.log("UPDATE DATA IN JSON");
  jsonDb[id] = user;
  //   jsonDb.write();
  writeFile(jsonDb);
  res.send({
    status: "OK",
    message: "User was updated successfully.",
    data: id,
  });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  if (id >= jsonDb.length) {
    return res.status(404).send({
      status: "ERROR",
      message: `Cannot find User with id=${id}.`,
      data: "",
    });
  }

  jsonDb.splice(id, 1);
  writeFile(jsonDb);
  res.send({
    status: "OK",
    message: "User was deleted successfully.",
    data: id,
  });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  jsonDb.data = [];
  //   jsonDb.write();
  writeFile(jsonDb.data);
  res.send({
    status: "OK",
    message: "All deleted.",
    data: "",
  });
};
