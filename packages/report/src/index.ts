import path from "path";
type Options = {};
class Report {
  options: Options;
  constructor(options: Options) {
    this.options = options;
  }
  apply(compiler) {
    // afterEmit在生成文件到output目录之后执行
    compiler.hooks.afterEmit.tapAsync(
      "report",
      async (compilation, callback) => {
        const files = this.getFiles(compilation);
        console.log("778899");
        return;
        // try {
        //   await this.createRelease();
        //   await this.uploadFiles(files);
        //   console.info("\n\u001b[32mUpload successfully.\u001b[39m\n");
        // } catch (error) {
        //   // todo
        // }
        // callback(null);
      }
    );
  }
  getFiles(compilation) {
    // 通过 compilation.assets 获取我们需要的文件信息，格式信息
    // compilation.assets {
    // 'bundle.js': SizeOnlySource { _size: 212 },
    // 'bundle.js.map': SizeOnlySource { _size: 162 }
    // }
    // return Object.keys(compilation.assets)
    //   .map((name) => {
    //     if (this.isIncludeOrExclude(name)) {
    //       return { name, filePath: this.getAssetPath(compilation, name) };
    //     }
    //     return null;
    //   })
    //   .filter(Boolean);
  }
  // isIncludeOrExclude(filename) {
  //   const isIncluded = this.include ? this.include.test(filename) : true;
  //   const isExcluded = this.exclude ? this.exclude.test(filename) : false;

  //   return isIncluded && !isExcluded;
  // }
  // 获取文件的绝对路径
  getAssetPath(compilation, name) {
    return path.join(
      compilation.getPath(compilation.compiler.outputPath),
      name.split("?")[0]
    );
  }
  // 上传文件
  // async uploadFile({ filePath, name }) {
  //   console.log(filePath);
  //   try {
  //     await request({
  //       url: `${this.sentryReleaseUrl()}/${this.release}/files/`, // 上传的sentry路径
  //       method: "POST",
  //       auth: {
  //         bearer: this.apiKey,
  //       },
  //       headers: {},
  //       formData: {
  //         file: fs.createReadStream(filePath),
  //         name: this.filenameTransform(name),
  //       },
  //     });
  //   } catch (e) {
  //     console.error(`uploadFile failed ${filePath}`);
  //   }
  // }

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
