import sequelize from "../db/sequelize";
import { DataTypes } from "sequelize";

const errorModel = sequelize.define(
  "error",
  {
    id: {
      type: DataTypes.BIGINT,
      field: "id",
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      field: "name",
    },
    key: {
      type: DataTypes.STRING,
      field: "key"
    },
    occur: {
      type: DataTypes.INTEGER,
      field: "occur",
    },
    value: {
      type: DataTypes.TEXT,
      field: "value",
    },
    source: {
      type: DataTypes.STRING,
      field: "source"
    },
    project: {
      type: DataTypes.STRING,
      field: "project",
    },
    projectSub: {
      type: DataTypes.STRING,
      field: "projectSub",
    },
    identity: {
      type: DataTypes.STRING,
      field: "identity"
    },
    referer: {
      type: DataTypes.STRING,
      field: "referer",
    },
    level: {
      type: DataTypes.STRING,
      field: "level",
    },
    record_time: {
      type: DataTypes.DATE,
      field: "record_time",
    },
    report_time: {
      type: DataTypes.DATE,
      field: "report_time",
    },
  },
  {
    tableName: "error",
    timestamps: false,
  }
);
export type ErrorModel = typeof errorModel;
export default errorModel;
