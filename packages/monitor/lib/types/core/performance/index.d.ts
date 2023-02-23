import { Store, ReportInfo } from '../../common';
import { InitOptions, PerformanceType, ReportValue } from '../../types';
declare class Performance {
    newStore: InstanceType<typeof Store>;
    reportInfo: ReportInfo;
    constructor(options: InitOptions);
    init(): void;
    report(): void;
    setStore(secondType: PerformanceType, value: ReportValue): void;
}
export default Performance;
