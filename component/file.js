var fs = require("fs");

exports.writeFile = function (obj) {
  var json = JSON.stringify(obj);
  fs.writeFileSync("userDB.json", json, "utf8");
};

exports.readFile = function () {
  try {
    var data = fs.readFileSync("userDB.json", "utf8");
    var obj = JSON.parse(data);
  } catch (error) {}

  return obj ?? [];
};
