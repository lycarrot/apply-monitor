import { BaseReportData } from './common';
export declare enum PerformanceType {
    'first-paint' = "FP",
    'first-contentful-paint' = "FCP",
    'largest-contentful-paint' = "LCP",
    'layout-shift' = "CLS"
}
export interface PerformanceReportData extends BaseReportData {
    value?: string | number;
}
export interface StoreData {
    [prop: string]: PerformanceReportData;
}
