import Koa from 'koa';
import router from './routes';
import logger from 'koa-logger';
import cors from 'koa2-cors';
import bodyParser from 'koa-bodyparser';
// import middlewares from './middlewares';
import helmet from 'koa-helmet';
import config from './config'

const app = new Koa();

app
    .use(logger())
    .use(helmet())
//     .use(middlewares())
    .use(bodyParser())
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods()); 

app.listen(config.port, () => {
    console.log(`Koa is listening in http://localhost:${config.port}`)
  });
export default app;
