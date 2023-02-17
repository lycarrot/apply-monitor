import { PerformanceReportData, PerformanceType, StoreData } from '../types';
declare class Store {
    store: Map<PerformanceType, PerformanceReportData>;
    constructor();
    get(key: PerformanceType): PerformanceReportData;
    set(key: PerformanceType, val: PerformanceReportData): void;
    clear(): void;
    getValues(): StoreData;
}
export { Store };
