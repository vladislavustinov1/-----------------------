const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelizeDB = new Sequelize(
  `diplom`,
  process.env.DB_LOGIN,
  process.env.DB_PASSWORD,
  {
    dialect: "postgresql",
    host: "127.0.0.1",
    port: "5432",
  }
);

const User = sequelizeDB.define("users", {
  uuid: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  avatar: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "/images/avatars/default.jpg",
  },
});

module.exports = { User, sequelizeDB };
