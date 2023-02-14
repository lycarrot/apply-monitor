declare class ReportInfo {
    url: string;
    data: any;
    constructor(url: string);
    send(data: any): void;
    useImg(data: any): void;
}
export { ReportInfo };
