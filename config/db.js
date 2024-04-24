const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  `diplomaDB`,
  process.env.DB_LOGIN,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const User = sequelize.define("users", {
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
});
