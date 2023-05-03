import Router from "koa-router";
import type { Context } from "koa";
import uploadFile from '../utils/uploadFile'
import Resolve from "../utils/resolve";

const router = new Router();

router.post(
  "/upload/sourcemap",
  uploadFile().single("file"),
  async (ctx:Context) => {
    ctx.body = Resolve.success('上传成功');
  }
);


export default router;
