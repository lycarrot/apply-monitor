import Router from 'koa-router'
import type { Context, Request } from 'koa'
import type { ReportData, QueueItem } from '../types'
import Resolve from '../utils/resolve'
import queue from '../db/queueRedis'
import crypto from 'crypto'

const router = new Router()

router.post('/info/detail', async (ctx: Context) => {
  const request: Request = ctx.request
  const data = JSON.parse(request.body as string) as ReportData
  const {
    secondType,
    value,
    project,
    version,
    projectSub,
    identity,
    referer,
    level,
  } = data
  const item: QueueItem = {
    name: secondType,
    value: JSON.stringify(value),
    project,
    version,
    projectSub,
    identity,
    referer,
    level,
  }
  let queueName = ''
  // 性能收集
  if (data.type == 'performance') {
    queueName = 'handlePerformance'
  } else if (data.type == 'error') {
    queueName = 'handleError'
    // 项目名称+标签页唯一标识+页面来源+报错信息构成唯一key
    const valueStr = Object.keys(value)
      .map((key) => `${key}:${value[key]}`)
      .join(';')
    const key = crypto
      .createHash('md5')
      .update(project + projectSub + identity + referer + valueStr)
      .digest('hex')
    item.key = key
    // reverseSourceMap(data);
  }
  try {
    // 创建性能redis队列
    const job = queue
      .create(queueName, { item })
      .ttl(60000)
      .removeOnComplete(true)
    job.on('failed', function (errorMessage) {
      log.trace(`${queueName} job faild`, errorMessage)
    })
    job.save((err: any) => {
      if (err) {
        log.trace(`${queueName} job failed!`)
      }
      log.trace(`${queueName} job saved!`, job.id)
    })
    ctx.body = Resolve.success()
  } catch (err) {
    ctx.body = Resolve.fail()
  }
})

export default router
