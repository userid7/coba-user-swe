// import { join, dirname } from "path";
// import { Low, JSONFile } from "lowdb";
// import { fileURLToPath } from "url";

const dbConfig = require("./config/db.config.js");

// init Json File DB
// const __dirname = dirname(fileURLToPath(import.meta.url));

// const file = join(__dirname, "db.json");
// const adapter = new JSONFile(file);
// const jsonDb = new Low(adapter);
// module.exports = jsonDb;

// init JSON DB
const readFile = require("./component/file");

// init Sequalize
const { Sequelize } = require("sequelize");
const { init } = require("express/lib/application");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./model/user.model")(sequelize, Sequelize);
module.exports = db;
