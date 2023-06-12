import Redis from 'ioredis'
import config from 'config'

interface ObjectConfig {
  [key: string]: any
}
const connections: ObjectConfig = {}
const redisServers = config.get('redis') as ObjectConfig

Object.keys(redisServers).forEach((item) => {
  const redisConfig = redisServers[item]
  let client
  if (Array.isArray(redisConfig)) {
    client = new Redis.Cluster(redisConfig)
  } else {
    client = new Redis(redisConfig)
  }
  client.on('error', (err) => {
    log.error(`${item} redis error11: ${err}`)
  })
  client.on('ready', () => {
    log.info(`${item} redis connected`)
  })
  connections[item] = client
})

export default connections
