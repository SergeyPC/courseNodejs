import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Item = sequelize.define("Item", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("new", "done"),
    defaultValue: "new",
  },
});

export default Item;
