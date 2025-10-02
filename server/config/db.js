const { Sequelize } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST, port: process.env.DB_PORT || 3306, dialect: "mariadb", logging: false,
});
const connectDB = async () => {
  try { await sequelize.authenticate(); console.log("db ok"); await sequelize.sync(); }
  catch (e) { console.error("db error:", e.message); process.exit(1); }
};
module.exports = { sequelize, connectDB };
