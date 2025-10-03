const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const Bookmark = sequelize.define("Bookmark", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  url: { type: DataTypes.TEXT, allowNull: false },
  title: { type: DataTypes.STRING(200), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  favicon: { type: DataTypes.TEXT, allowNull: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: "bookmarks" });
User.hasMany(Bookmark, { foreignKey: "userId", onDelete: "CASCADE" });
Bookmark.belongsTo(User, { foreignKey: "userId" });
module.exports = Bookmark;
