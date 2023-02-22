import { Store, ReportInfo } from '../../common';
import { InitOptions, MonitorType } from '../../types';
declare class Performance {
    newStore: InstanceType<typeof Store>;
    reportInfo: ReportInfo;
    constructor(options: InitOptions);
    init(): void;
    report(): void;
    setStore(type: MonitorType, secondType: string, value: any): void;
}
export default Performance;
