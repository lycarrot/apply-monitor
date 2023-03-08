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
    request(data: any): Promise<import("axios").AxiosResponse<any, any>>;
    getFiles(compilation: any): FileLists[];
    getAssetPath(compilation: any, name: any): string;
    uploadFiles(files: any): void;
    uploadFile({ filePath, name }: {
        filePath: any;
        name: any;
    }): Promise<void>;
}
export default Report;
