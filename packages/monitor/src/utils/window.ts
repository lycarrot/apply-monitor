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

export const isNavigator = (): boolean => {
  return !!window.navigator;
};

// dom 对象是否在屏幕内
export const isInScreen = (dom) => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const rectInfo = dom.getBoundingClientRect();
  if (
    rectInfo.left >= 0 &&
    rectInfo.left < viewportWidth &&
    rectInfo.top >= 0 &&
    rectInfo.top < viewportHeight
  ) {
    return true;
  }
};

export const isIncludeEle = function (node, arr) {
  if (!node || node === document.documentElement) {
    return false;
  }

  if (arr.includes(node)) {
    return true;
  }

  return isIncludeEle(node.parentElement, arr);
};

export const getUrl = (): string => {
  return window.location.href;
};
