import { InitOptions, VueInstance } from '../../types';
import { ReportInfo } from '../../common';
declare class InitError {
    reportInfo: ReportInfo;
    constructor(options: InitOptions);
    init(options: InitOptions): void;
    handleJS(): void;
    handleVue(Vue: VueInstance): void;
    handleAajxError(): void;
}
export default InitError;
