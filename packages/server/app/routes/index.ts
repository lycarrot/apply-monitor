import Router from "koa-router";
import collect from "./collect";
import common from "./common";
const router = new Router({
  prefix: "/api",
});

router.use("/collect", collect.routes(), collect.allowedMethods());
router.use("/common", common.routes(), common.allowedMethods());

export default router;
