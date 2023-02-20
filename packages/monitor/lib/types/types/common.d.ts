export declare enum MonitorType {
    ERROR = "error",
    PERFORMANCE = "performance"
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
    level?: Level;
}
export interface ObjAnyAttr {
    [key: string]: any;
}
