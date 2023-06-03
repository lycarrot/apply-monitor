import Koa from 'koa'
import router from './routes'
import cors from 'koa2-cors'
import bodyParser from 'koa-bodyparser'
import middlewares from './middlewares'
import helmet from 'koa-helmet'
import config from 'config'
import bunyan from 'bunyan'
import bunyanLogger from 'koa-bunyan-logger'
// import jwt from 'koa-jwt'
import validate from 'koa-validate'
import redis from '../app/db/redis'

global.redis = redis

global.log = bunyan.createLogger({
  name: 'monitor-server',
  level: 'trace',
})

const port = config.get('port') as number
const host = config.get('host') as string

const app = new Koa()

// app.use(multiparty({uploadDir:'./temp' }));
app
  .use(bunyanLogger())
  .use(bunyanLogger.requestIdContext())
  .use(bunyanLogger.requestLogger())
  .use(helmet())
  .use(middlewares())
  .use(
    bodyParser({
      jsonLimit: '10mb',
      textLimit: '10mb',
      enableTypes: ['json', 'form', 'text'],
    })
  )
  .use(cors())
  .use(router.routes())
  .use(router.allowedMethods())

validate(app)

app.listen(port, host, () => {
  log.info(`Koa is listening in http://${host}:${port}`)
})

export default app
