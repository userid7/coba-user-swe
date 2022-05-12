const controller = require("../controller/auth.controller");
module.exports = function (app) {
  

  app.post("/api/auth/signin", controller.signin);
};
