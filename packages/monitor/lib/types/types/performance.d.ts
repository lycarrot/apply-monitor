import { BaseReportData, ObjAnyAttr } from './common';
export declare enum PerformanceType {
    'first-paint' = "FP",
    'first-contentful-paint' = "FCP",
    'largest-contentful-paint' = "LCP",
    'layout-shift' = "CLS",
    'first-input' = "FID",
    'nav-connecttion' = "NC",
    'navigation' = "Navigation",
    'memory' = "Memory"
}
export interface PerformanceReportData extends BaseReportData {
    value?: string | number | ObjAnyAttr;
    event?: string;
}
export interface StoreData {
    [prop: string]: PerformanceReportData;
}
export interface LayoutShift extends PerformanceEntry {
    value: number;
    hadRecentInput: boolean;
}
