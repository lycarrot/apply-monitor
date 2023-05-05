export default {
  port: 8080,
  host: '127.0.0.1',
  secret: '123456',
  mysql: {
    database: 'monitor',
    user: 'root',
    password: '123456',
    host: '127.0.0.1',
    port: 3306,
  },
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
  kueRedis: {
    host: '127.0.0.1',
    port: 6379,
  },
  sourceMap: 'static/sourcemap',
}
