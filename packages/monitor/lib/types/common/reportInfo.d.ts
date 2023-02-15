import { CompleteReportData, InitOptions } from '../types';
import { Queue } from './queue';
declare class ReportInfo {
    queue: Queue;
    url: string;
    senday: string;
    constructor(options: InitOptions);
    send(data: CompleteReportData): void;
    useImg(data: CompleteReportData): void;
    useAjax(data: CompleteReportData): void;
}
export { ReportInfo };
