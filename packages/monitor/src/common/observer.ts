type handler = {
  (entry: PerformanceEntry): void;
};
export function observe(type: string, handler: handler): void {
  if (PerformanceObserver.supportedEntryTypes.includes(type)) {
    const observe = new PerformanceObserver((item) =>
      item.getEntries().map(handler)
    );
    observe.observe({ type: type });
  }
}
