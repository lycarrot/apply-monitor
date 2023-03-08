import collect from '../controllers/collect';
import Router from 'koa-router';

const router = new Router();

router.get('/collect/collect', collect.getInfo);

router.get('/collect/sourcemap', collect.getSourcemap);

export default router