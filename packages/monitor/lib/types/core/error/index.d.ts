import { InitOptions } from '../../types';
declare class InitError {
    constructor(options: InitOptions);
    init(options: InitOptions): void;
    handleJS(): void;
}
export default InitError;
