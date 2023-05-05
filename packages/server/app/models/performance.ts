import sequelize from '../db/sequelize'
import { DataTypes } from 'sequelize'

const performanceModel = sequelize.define(
  'performance',
  {
    id: {
      type: DataTypes.BIGINT,
      field: 'id',
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      field: 'name',
    },
    value: {
      type: DataTypes.STRING(1000),
      field: 'value',
    },
    project: {
      type: DataTypes.STRING,
      field: 'project',
    },
    version: {
      type: DataTypes.STRING,
      field: 'version',
    },
    projectSub: {
      type: DataTypes.STRING,
      field: 'projectSub',
    },
    referer: {
      type: DataTypes.STRING,
      field: 'referer',
    },
    identity: {
      type: DataTypes.STRING,
      field: 'identity',
    },
    level: {
      type: DataTypes.STRING,
      field: 'level',
    },
  },
  {
    tableName: 'performance',
  }
)
export type PerformanceModel = typeof performanceModel
export default performanceModel
