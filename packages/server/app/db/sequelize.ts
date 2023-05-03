"use strict";

import {Sequelize} from "sequelize";
import config from "config";

interface MysqlConfig {
  database: string;
  user: string;
  password: string;
  host: string;
  port: number;
}

const mysqlConfig: MysqlConfig = config.get("mysql");

// 数据库链接
const sequelize = new Sequelize(
  mysqlConfig.database,
  mysqlConfig.user,
  mysqlConfig.password,
  {
    host: mysqlConfig.host,
    port: mysqlConfig.port,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    timezone: '+08:00'
  }
);

sequelize.sync()

sequelize
  .authenticate()
  .then((res) => {
    log.info("Connection has been established successfully.");
  })
  .catch((err) => {
    log.error("Unable to connect to the database:", err);
  });

// mysql.sync({ force: false })

export default sequelize;
