import multer from 'koa-multer'
import path from 'path'
import config from 'config'
import { queryUrl, mkdirsSync } from '../utils/helper'
// import fs from "fs";

const sourceMapFile = config.get('sourceMap')

function uploadFile() {
  const storage = multer.diskStorage({
    destination: async function (req: any, file: any, cb: any) {
      const params = queryUrl(req.url)
      const complPath = path.resolve(
        `${sourceMapFile}/${params && params.project}/${
          params && params.version
        }`
      )
      mkdirsSync(complPath)
      // const files = await fs.readdirSync(complPath);
      //   if(files.length){
      //     files.forEach(async (file:string) => {
      //       const childPath = complPath + "/" + file;
      //       await fs.unlinkSync(childPath);
      //     });
      // }
      cb(null, complPath)
    },
    filename: (ctx: any, file: any, cb: any) => {
      cb(null, file.originalname)
    },
  })
  //过滤上传的后缀为txt的文件
  const fileFilter = (ctx: any, file: any, cb: any) => {
    if (file.originalname.split('.').splice(-1) == 'txt') {
      cb(null, false)
    } else {
      cb(null, true)
    }
  }
  const upload = multer({ storage, fileFilter })
  return upload
}

export default uploadFile
