import path from "path";
import fs from "fs";
import request from "request-promise";
import PromisePool from "es6-promise-pool";


interface Options {
  url: string;
  project: string;
  version: string | number;
  include?: RegExp;
  exclude?: RegExp;
  afterDelMap?:boolean;
  delInclude?:RegExp;
}
interface FileLists {
  name: string;
  filePath: string;
}
const DEFAULT_INCLUDE = /\.js$|\.map$/;
const DEFAULT_DELETE = /\.map$/;

class Report {
  options: Options;
  constructor(options:Options) {
    this.options = options;
    this.options.include = this.options.include || DEFAULT_INCLUDE;
    this.options.delInclude = this.options.delInclude || DEFAULT_DELETE;
  }
  apply(compiler) {
    this.isRequiredCondition();
    // afterEmit在生成文件到output目录之后执行
    compiler.hooks.afterEmit.tapAsync(
      "report",
      async (compilation, callback) => {
        const files = this.getFiles(compilation);
        await this.uploadFiles(files);
        callback(null);
      }
    );
    compiler.hooks.done.tapPromise("report", async (stats) => {
      if (this.options.afterDelMap) {
        await this.deleteFiles(stats);
      }
    });
  }
  isRequiredCondition(): Error | null {
    if (!this.options.url) {
      return new Error("上传sourcemap的url必填");
    } else if (!this.options.project) {
      return new Error("项目名称必填");
    } else if (!this.options.version) {
      return new Error("项目source版本必填");
    } else {
      return null;
    }
  }
  // 获取上传的文件名称和路径
  getFiles(compilation): FileLists[] {
    return Object.keys(compilation.assets)
      .map((name: string) => {
        if (this.isIncludeOrExclude(name)) {
          return { name, filePath: this.getAssetPath(compilation, name) };
        }
        return null;
      })
      .filter((i) => i);
  }
  // 判断包含和排除上传文件
  isIncludeOrExclude(filename): boolean {
    const isIncluded: boolean = this.options.include
      ? this.options.include.test(filename)
      : true;
    const isExcluded: boolean = this.options.exclude
      ? this.options.exclude.test(filename)
      : false;
    return isIncluded && !isExcluded;
  }
  // 获取文件的绝对路径
  getAssetPath(compilation, name) {
    return path.join(
      compilation.getPath(compilation.compiler.outputPath),
      name.split("?")[0]
    );
  }
  uploadFiles(files) {
    const pool = new PromisePool(() => {
      const file = files.pop();
      if (!file) {
        return null;
      }
      return this.uploadFile(file);
    }, 5);
    return pool.start();
  }
  // 文件上传
  async uploadFile({ filePath, name }) {
    let result = await request({
      uri: `${this.options.url}?project=${this.options.project}&version=${this.options.version}`,
      method: "POST",
      contentType: "multipart/form-data",
      formData: {
        file: fs.createReadStream(filePath),
        name: name,
        project: this.options.project,
        version: this.options.version,
      },
    })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.error("err", err);
      });
  }
  // 删除文件
  async deleteFiles(stats) {
    Object.keys(stats.compilation.assets)
      .filter((name) => this.options.delInclude.test(name))
      .forEach((name) => {
        const filePath = this.getAssetPath(stats.compilation, name);
        if (filePath) {
          console.log(filePath);
          fs.unlinkSync(filePath);
        } else {
          console.warn("文件不存在或已经删除完了");
        }
      });
  }
}

export default Report;
