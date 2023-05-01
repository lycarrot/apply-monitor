import path from "path";
import fs from "fs";
interface Params {
  [key: string]: string;
}

// 递归创建目录 同步方法
export const mkdirsSync = (dirname: string) => {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
};
// 递归创建目录 异步方法
export const mkdirs = (
  dirname: string,
  callback = () => {
    console.log("done");
  }
) => {
  fs.access(dirname, (err) => {
    if (err) {
      return mkdirs(path.dirname(dirname), function () {
        fs.mkdir(dirname, callback);
      });
    }
    callback && callback();
  });
};

export const queryUrl = (url: string):Params|null => {
  if (!url) return null
  let name, value;
  let num = url.indexOf("?");
  let arr = url.slice(num + 1).split("&");
  let obj: Params = {};
  for (let i = 0; i < arr.length; i++) {
    const keyArr = arr[i].split("=");
    name = keyArr[0];
    value = keyArr[1];
    obj[name] = value;
  }
  return obj;
};
