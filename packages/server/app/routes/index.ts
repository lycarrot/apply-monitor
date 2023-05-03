import Router from "koa-router";
import collect from "./collect";
import common from "./common";
import error from "./error";
const router = new Router({
  prefix: "/api",
});

router.use("/collect", collect.routes(), collect.allowedMethods());
router.use("/common", common.routes(), common.allowedMethods());
router.use("/error", error.routes(), error.allowedMethods());

export default router;
