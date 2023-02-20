import { ErrorReportData, InitOptions } from '../types';
import { Queue } from './queue';
declare class ReportInfo {
    queue: Queue;
    url: string;
    senday: string;
    constructor(options: InitOptions);
    send(data: ErrorReportData): void;
    useImg(data: ErrorReportData): void;
    useAjax(data: ErrorReportData): void;
}
export { ReportInfo };
