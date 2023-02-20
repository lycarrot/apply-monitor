type handler = {
    (entry: PerformanceEntry): void;
};
export declare function observe(type: string, handler: handler): PerformanceObserver | undefined;
export {};
