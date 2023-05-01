interface Options {
    url: string;
    project: string;
    version: string | number;
    include?: RegExp;
    exclude?: RegExp;
    afterDelMap?: boolean;
    delInclude?: RegExp;
}
interface FileLists {
    name: string;
    filePath: string;
}
declare class Report {
    options: Options;
    constructor(options: Options);
    apply(compiler: any): void;
    isRequiredCondition(): Error | null;
    getFiles(compilation: any): FileLists[];
    isIncludeOrExclude(filename: any): boolean;
    getAssetPath(compilation: any, name: any): string;
    uploadFiles(files: any): PromiseLike<void>;
    uploadFile({ filePath, name }: {
        filePath: any;
        name: any;
    }): Promise<void>;
    deleteFiles(stats: any): Promise<void>;
}
export default Report;
