import sequelize from "../config/database.js";
import User from "./User.js";
import Item from "./DbItem.js";

const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true }); 
    console.log("База данных синхронизирована!");
  } catch (error) {
    console.error("Ошибка синхронизации базы:", error);
  }
};

export { sequelize, User, Item, syncDB };
