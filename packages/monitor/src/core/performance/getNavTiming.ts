import {
  isPerformanceObserver,
  isPerformance,
  getNowTime,
  afterLoad,
} from '../../utils';
import { observe, Store } from '../../common';
import {
  PerformanceType,
  PerformanceReportData,
  MonitorType,
  ObjAnyAttr,
} from '../../types';

const entryType = 'navigation';
function setPerformanceData(
  store: InstanceType<typeof Store>,
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
  let data: PerformanceReportData = {
    type: MonitorType.PERFORMANCE,
    secondType: PerformanceType[entryType],
    time: getNowTime(),
    value: timing,
  };
  store.set(PerformanceType[entryType], data);
}

function getPerformanceentryTim(): PerformanceNavigationTiming {
  const entryTim = (
    performance.getEntriesByType('navigation').length > 0
      ? performance.getEntriesByType('navigation')[0]
      : performance.timing
  ) as PerformanceNavigationTiming;
  return entryTim;
}

export function getNavTiming(store: InstanceType<typeof Store>) {
  if (!isPerformanceObserver()) {
    if (!isPerformance()) {
      throw new Error('浏览器不支持performance');
    } else {
      afterLoad(() => {
        setPerformanceData(store, getPerformanceentryTim());
      });
    }
  } else {
    const entryHandler = (entry: PerformanceNavigationTiming): void => {
      if (ob) {
        ob.disconnect();
      }
      setPerformanceData(store, entry);
    };
    const ob: PerformanceObserver = observe(entryType, entryHandler);
  }
}
