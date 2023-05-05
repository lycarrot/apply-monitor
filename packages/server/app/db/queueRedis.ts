import kue from 'kue'
import type { Job, DoneCallback } from 'kue'
import config from 'config'
import services from '../services'

const redisConfig = config.get('kueRedis')
const queue = kue.createQueue({
  prefix: 'q',
  redis: redisConfig,
})

queue.on('error', function (err) {
  log.trace(`redis-queue error`, err)
})

queue.process('handlePerformance', (job: Job, done: DoneCallback) => {
  services.collect
    .handlePerformance(job.data.item)
    .then(() => done())
    .catch((err: string) => {
      log.error(err)
      done(err)
    })
})

const taskName = 'handleError'
queue.process(taskName, (job: Job, done: DoneCallback) => {
  log.trace(`${taskName} job begin`, job.id)
  services.collect
    .handleError(job.data.item)
    .then(() => {
      done()
      log.trace(`${taskName} job completed`, job.id)
      job.remove(function () {
        //手动移除
        log.trace(`${taskName} job removed`, job.id)
      })
    })
    .catch((err: string) => {
      log.error(err)
      done(err)
    })
})

export default queue
