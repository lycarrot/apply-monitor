import type { Models } from '../models'
class Collect {
  models: Models
  constructor(models: Models) {
    this.models = models
  }
  async handlePerformance(data: any) {
    this.createPerformance(data)
  }
  async createPerformance(data: any) {
    return this.models.performance.create(data)
  }
  async handleError(data: any) {
    //是否存在监控日志
    const exist: any = await this.getErrorByKey(data.key)
    if (exist) return this.updateErrorDigit(exist.occur + 1, exist.id)
    data.occur = 1
    //创建数据
    let row = await this.createError(data)
    row = row.toJSON()
    return row
  }
  createError(data: any) {
    return this.models.error.create(data)
  }
  getErrorByKey(key: string) {
    return this.models.error.findOne({
      raw: true,
      where: {
        key,
      },
    })
  }
  async updateErrorDigit(occur: number, id: number) {
    return this.models.error.update(
      {
        occur,
      },
      {
        where: { id },
      }
    )
  }
}
export default Collect
