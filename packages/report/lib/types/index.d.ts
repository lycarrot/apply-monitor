interface Options {
    url: string;
}
interface FileLists {
    name: string;
    filePath: string;
}
declare class Report {
    options: Options;
    constructor(options: any);
    apply(compiler: any): void;
    getFiles(compilation: any): FileLists[];
    getAssetPath(compilation: any, name: any): string;
    uploadFiles(files: any): void;
    uploadFile(file: any): void;
}
export default Report;
