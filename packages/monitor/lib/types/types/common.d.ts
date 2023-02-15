export declare enum MonitorType {
    ERROR = "error"
}
export declare enum Level {
    ERROR = "error",
    WARN = "warn",
    INFO = "info"
}
export interface BaseReportData {
    type: MonitorType;
    secondType?: string;
    time: number;
    level: Level;
}
export interface CompleteReportData extends BaseReportData {
    message?: string;
    filename?: string;
    tagName?: string;
    position?: string;
    stack?: string;
    info?: string;
    componentName?: string;
    status?: number;
    statusText?: string;
    url?: string;
}
export interface IAnyObject {
    [key: string]: any;
}
