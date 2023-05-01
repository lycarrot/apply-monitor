import multer from "koa-multer";
import path from "path";
import fs from "fs";
import {queryUrl,mkdirsSync} from "../utils/helper"


function uploadFile() {
  let storage = multer.diskStorage({
    destination: async function (req: any, file: any, cb: any) {
      const params=queryUrl(req.url)
      const directory=''
      const complPath = path.resolve(`static/sourcemap/${params&&params.project}/${params&&params.version}`);
      mkdirsSync(complPath)
      cb(null, complPath);
    },
    filename: (ctx: any, file: any, cb: any) => {
      cb(null, file.originalname);
    },
  });
  //过滤上传的后缀为txt的文件
  let fileFilter = (ctx: any, file: any, cb: any) => {
    if (file.originalname.split(".").splice(-1) == "txt") {
      cb(null, false);
    } else {
      cb(null, true);
    }
  };
  let upload = multer({ storage, fileFilter });
  return upload;
}

export default uploadFile;
