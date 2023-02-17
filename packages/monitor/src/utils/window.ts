export const isPerformance = (): boolean => {
  return (
    !!window.performance &&
    !!window.performance.getEntriesByType &&
    !!window.performance.mark
  );
};

export const isPerformanceObserver = (): boolean => {
  return !!window.PerformanceObserver;
};
