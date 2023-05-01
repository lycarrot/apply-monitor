import { PerReportData, ErrorReportData, CommonData, InitOptions } from '../types';
import { Queue } from './queue';
type Data = PerReportData | ErrorReportData;
type SendData = CommonData & Data;
declare class ReportInfo {
    queue: Queue;
    options: InitOptions;
    sendWay: string;
    constructor(options: InitOptions);
    beforeSend(data: Data): SendData;
    send(data: Data, isImmediate?: boolean): void;
    useImg(data: Data): () => void;
    useAjax(data: Data): () => void;
    useBeacon(data: Data): () => void;
}
export { ReportInfo };
