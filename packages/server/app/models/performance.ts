import sequelize from "../db/sequelize";
import { DataTypes } from "sequelize";


const performanceModel = sequelize.define(
  "performance",
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
    value: {
      type: DataTypes.STRING(1000),
      field: "value",
    },
    project: {
      type: DataTypes.STRING,
      field: "project",
    },
    projectSub: {
      type: DataTypes.STRING,
      field: "projectSub",
    },
    referer: {
      type: DataTypes.STRING,
      field: "referer",
    },
    identity: {
      type: DataTypes.STRING,
      field: "identity"
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
    tableName: "performance",
    timestamps: false,
  }
);
export type PerformanceModel=typeof performanceModel
export default performanceModel;
