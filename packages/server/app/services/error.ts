import type { Models } from "../models";
import { Op } from "sequelize";


class Error {
  models: Models;
  constructor(models: Models) {
    this.models = models;
  }

  async getErrorLists(data: any) {
    const { project, page = 1, pageSize = 20, startTime, endTime } = data;
    const where: any = {};
    if (project) {
      where.project = project;
    }
    if (startTime || endTime) {
      where.createdAt = { [Op.between]: [startTime, endTime] };
    }
    return this.models.error.findAndCountAll({
      where,
      order: [["id", "DESC"]],
      raw: true,
      limit: parseInt(pageSize),
      offset: (page - 1) * pageSize,
    });
  }
}
export default Error;
