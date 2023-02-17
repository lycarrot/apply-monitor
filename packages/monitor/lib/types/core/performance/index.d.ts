import { Store, ReportInfo } from '../../common';
import { InitOptions } from '../../types';
declare class Performance {
    newStore: InstanceType<typeof Store>;
    reportInfo: ReportInfo;
    constructor(options: InitOptions);
    init(): void;
    report(): void;
}
export default Performance;
