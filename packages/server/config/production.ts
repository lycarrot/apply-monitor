export default {
  port: 6666,
  host: '127.0.0.1',
  secret: '123456',
  mysql: {
    database: 'monitor',
    user: 'root',
    password: '123456',
    host: '8.134.132.121',
    port: 3306,
  },
  redis: {
    redis1: {
      host: '8.134.132.121',
      port: 6379,
    },
  },
  kueRedis: {
    host: '8.134.132.121',
    port: 6379,
  },
  sourceMap: 'static/sourcemap',
}
