
import koaRouter from 'koa-router';
import info from '../controllers/info';

const router = koaRouter({
    prefix: '/api/v1'
});

// API
router.get('/info/collect', info.getCollect);


export default router;
