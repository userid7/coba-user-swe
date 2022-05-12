const authJwt = require("../middleware/authJwt.js");

module.exports = (app) => {
  const users = require("../controller/user.controller.js");
  var router = require("express").Router();

  // router.use(authJwt.verifyToken);

  // Create a new user
  router.post("/", users.create);
  // Retrieve all users
  router.get("/", [authJwt.verifyToken], users.findAll);
  // Retrieve a single user with id
  router.get("/:id", [authJwt.verifyToken], users.findOne);
  // Update a user with id
  router.put("/:id", [authJwt.verifyToken], users.update);
  // Delete a user with id
  router.delete("/:id", [authJwt.verifyToken], users.delete);
  // Delete all users
  router.delete("/", [authJwt.verifyToken], users.deleteAll);

  app.use("/api/users", router);
};
