import type { InitOptions } from '../types';
declare class Monitor {
    constructor(options: InitOptions);
    init(options: InitOptions): void;
    isSetCondition(options: InitOptions): boolean;
    setDefault(options: InitOptions): void;
}
export default Monitor;
