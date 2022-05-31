const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: ["[a-z]", "i"], // will only allow letters
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: { isEmail: true },
        unique: { args: true, msg: "Email address already in use!" },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 4,
      },
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          {
            user.password =
              user.password && user.password != ""
                ? bcrypt.hashSync(user.password, 10)
                : "";
          }
        },
        beforeBulkUpdate: (user, options) => {
          {
            user.password =
              user.password && user.password != ""
                ? bcrypt.hashSync(user.password, 10)
                : "";
          }
        },
      },
    }
  );
  return User;
};
