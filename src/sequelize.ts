import * as path from "path";
import { Sequelize } from "sequelize-typescript";

const jsonConfig = require("./config/config.json");
// const dbConfig = jsonConfig[process.env.NODE_ENV || "test"];
const dbConfig = jsonConfig["test"];
const urlModels = path.join(__dirname, "./Models");
console.log("------------test", dbConfig)
class Database {
  public sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize({
      database: dbConfig.database,
      dialect: dbConfig.dialect,
      host: dbConfig.host,
      modelPaths: [ urlModels ],
      password: dbConfig.password,
      // timezone: "America/Sao_Paulo",
      username: dbConfig.username,
    });
  }

  public getSequelize() {
    return this.sequelize;
  }
}

export const database = new Database();
export const sequelize = database.getSequelize();
