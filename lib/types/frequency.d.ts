/**
 * 防抖
 * @param fn
 * @param delay
 * @returns
 */
export declare const throttle: (fn: () => any, delay: number) => () => void;
/**
 * 节流
 * @param fn
 * @param wait
 * @param immediate
 * @returns
 */
export declare const debounce: (fn: () => any, wait: any, immediate?: boolean) => () => void;
