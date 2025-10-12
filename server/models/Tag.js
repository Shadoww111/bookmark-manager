const { DataTypes } = require("sequelize"); const { sequelize } = require("../config/db"); const User = require("./User"); const Bookmark = require("./Bookmark");
const Tag = sequelize.define("Tag", { id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, name: { type: DataTypes.STRING(30), allowNull: false }, color: { type: DataTypes.STRING(7), defaultValue: "#6366f1" }, userId: { type: DataTypes.INTEGER, allowNull: false } }, { tableName: "tags" });
const BookmarkTag = sequelize.define("BookmarkTag", {}, { tableName: "bookmark_tags", timestamps: false });
Bookmark.belongsToMany(Tag, { through: BookmarkTag }); Tag.belongsToMany(Bookmark, { through: BookmarkTag }); User.hasMany(Tag, { foreignKey: "userId", onDelete: "CASCADE" });
module.exports = { Tag, BookmarkTag };
