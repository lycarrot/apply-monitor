type handler = {
  (entry: PerformanceEntry): void;
};

export function observe(
  type: string,
  handler: handler
): PerformanceObserver | undefined {
  if (PerformanceObserver.supportedEntryTypes.includes(type)) {
    const ob: PerformanceObserver = new PerformanceObserver((item) =>
      item.getEntries().map(handler)
    );
    ob.observe({ type: type, buffered: true });
    return ob;
  }
}
