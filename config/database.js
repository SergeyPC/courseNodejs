import { Sequelize } from "sequelize";
import 'dotenv/config';

const sequelize = new Sequelize(
  process.env.DB_NAME,     
  process.env.DB_USER,    
  process.env.DB_PASS,     
  {
    host: process.env.DB_HOST,  
    port: process.env.DB_PORT,   
    dialect: "postgres",         
    logging: false, 
  }
);

// Проверка подключения
sequelize.authenticate()
  .then(() => console.log("✅ Успешное подключение к PostgreSQL"))
  .catch((err) => console.error("❌ Ошибка подключения:", err));

export default sequelize;
