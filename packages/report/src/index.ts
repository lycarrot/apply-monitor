import path from "path";
import fs from "fs";
import request from "request-promise";
import PromisePool from "es6-promise-pool";

interface Options {
  url: string;
}
interface FileLists {
  name: string;
  filePath: string;
}
class Report {
  options: Options;
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    // afterEmit在生成文件到output目录之后执行
    compiler.hooks.afterEmit.tapAsync(
      "report",
      async (compilation, callback) => {
        const files = this.getFiles(compilation);

        await this.uploadFiles(files);
        callback(null);
      }
    );
  }
  getFiles(compilation) {
    // 通过 compilation.assets 获取我们需要的文件信息，格式信息
    let fileLists: FileLists[] = [];
    const reg = /\.(js.map|css.map)$/;
    Object.keys(compilation.assets).forEach((name) => {
      if (reg.test(name)) {
        fileLists.push({
          name,
          filePath: this.getAssetPath(compilation, name),
        });
      }
    });
    return fileLists;
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
    }, 3);
    return pool.start();
  }

  async uploadFile({ filePath, name }) {
    await request({
      url: `${this.options.url}`,
      method: "POST",
      headers: {},
      formData: {
        file: fs.createReadStream(filePath),
        name: name,
      },
    })
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  // 删除 sourcemaps
  // sentryDel(compiler) {
  //   compiler.hooks.done.tapAsync(this.name, async (stats, callback) => {
  //     console.log("Whether to delete SourceMaps:", this.isDeleteSourceMaps);
  //     if (this.isDeleteSourceMaps) {
  //       await this.deleteFiles(stats);
  //       console.info("\n\u001b[32mDelete SourceMaps done.\u001b[39m\n");
  //     }
  //     callback(null);
  //   });
  // }
  // 删除文件
  // async deleteFiles(stats) {
  //   console.log();
  //   console.info("\u001b[33mStarting delete SourceMaps...\u001b[39m\n");

  //   Object.keys(stats.compilation.assets)
  //     .filter((name) => this.deleteRegex.test(name))
  //     .forEach((name) => {
  //       const filePath = this.getAssetPath(stats.compilation, name);
  //       if (filePath) {
  //         console.log(filePath);
  //         fs.unlinkSync(filePath);
  //       } else {
  //         console.warn(
  //           `bss-plugin-sentry: 不能删除 '${name}', 文件不存在, 由于生成错误它可能没有创建`
  //         );
  //       }
  //     });
  // }
}

export default Report;
