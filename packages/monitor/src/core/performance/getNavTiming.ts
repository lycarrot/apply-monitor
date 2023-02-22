import { isPerformanceObserver, isPerformance, onLoaded } from '../../utils';
import { observe } from '../../common';
import { PerformanceType, ObjAnyAttr, SetStore } from '../../types';

// navigation 可以获取到用户访问一个页面的每个阶段的精确时间
function setPerformanceData(
  setStore: SetStore,
  entry: PerformanceNavigationTiming
) {
  const {
    domainLookupStart,
    domainLookupEnd,
    connectStart,
    connectEnd,
    secureConnectionStart,
    requestStart,
    responseStart,
    responseEnd,
    domInteractive,
    domContentLoadedEventStart,
    domContentLoadedEventEnd,
    loadEventStart,
    fetchStart,
  } = entry;
  let timing: ObjAnyAttr = {
    // DNS解析时间
    dnsLookup: (domainLookupEnd - domainLookupStart).toFixed(2),
    // TCP完成握手时间
    initialConnection: (connectEnd - connectStart).toFixed(2),
    // ssl连接时间
    ssl: secureConnectionStart
      ? (connectEnd - secureConnectionStart).toFixed(2)
      : 0,
    // HTTP请求响应完成时间
    ttfb: (responseStart - requestStart).toFixed(2),
    // 读取页面第一个字节的时间
    contentDownload: (responseEnd - responseStart).toFixed(2),
    // dom解析时间
    domParse: (domInteractive - responseEnd).toFixed(2),
    // DOM 准备就绪时间
    deferExecuteDuration: (domContentLoadedEventStart - domInteractive).toFixed(
      2
    ),
    // 脚本加载时间
    domContentLoadedCallback: (
      domContentLoadedEventEnd - domContentLoadedEventStart
    ).toFixed(2),
    // onload事件时间
    resourceLoad: (loadEventStart - domContentLoadedEventEnd).toFixed(2),
    // DOM阶段渲染耗时
    domReady: (domContentLoadedEventEnd - fetchStart).toFixed(2),
  };

  setStore(PerformanceType.NAV, timing);
}

function getPerformanceentryTim(): PerformanceNavigationTiming {
  const entryTim = (
    performance.getEntriesByType('navigation').length > 0
      ? performance.getEntriesByType('navigation')[0]
      : performance.timing
  ) as PerformanceNavigationTiming;
  return entryTim;
}

export function getNavTiming(setStore: SetStore) {
  if (!isPerformanceObserver()) {
    if (!isPerformance()) {
      throw new Error('浏览器不支持performance');
    } else {
      onLoaded(() => {
        setPerformanceData(setStore, getPerformanceentryTim());
      });
    }
  } else {
    const entryHandler = (entry: PerformanceNavigationTiming): void => {
      if (ob) {
        ob.disconnect();
      }
      setPerformanceData(setStore, entry);
    };
    const ob: PerformanceObserver = observe(PerformanceType.NAV, entryHandler);
  }
}
