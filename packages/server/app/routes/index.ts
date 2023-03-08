
import Router from 'koa-router';
import collect from './collect';


const router =new  Router({
    prefix: '/api/v1'
});
// router.prefix('/api')

router.use('/collect', collect.routes(), collect.allowedMethods());
export default router;