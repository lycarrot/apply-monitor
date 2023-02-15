declare class Queue {
    pending: Boolean;
    callbacks: any[];
    constructor();
    push(fn: () => void): void;
    flushCallbacks(): void;
    getCallbacks(): any[];
    clear(): void;
}
export { Queue };
