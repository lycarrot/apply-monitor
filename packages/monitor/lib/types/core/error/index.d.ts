import { InitOptions, ErrorType, VueInstance, ReportValue } from '../../types';
import { ReportInfo } from '../../common';
declare class Error {
    reportInfo: ReportInfo;
    constructor(options: InitOptions);
    init(options: InitOptions): void;
    report(secondType: ErrorType, value: ReportValue): void;
    handleJS(): void;
    handleVue(Vue: VueInstance): void;
    handleAajxError(): void;
}
export default Error;
