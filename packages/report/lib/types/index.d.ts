type Options = {};
declare class Report {
    options: Options;
    constructor(options: Options);
    apply(compiler: any): void;
    getFiles(compilation: any): void;
    getAssetPath(compilation: any, name: any): string;
}
export default Report;
