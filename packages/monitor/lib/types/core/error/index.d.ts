import { InitOptions } from '../../types';
import { ReportInfo } from '../../common';
declare class InitError extends ReportInfo {
    constructor(options: InitOptions);
    init(options: InitOptions): void;
    handleJS(): void;
}
export default InitError;
