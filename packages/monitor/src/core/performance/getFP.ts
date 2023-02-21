import {
  isPerformanceObserver,
  isPerformance,
  getNowTime,
  onLoaded,
} from '../../utils';
import { observe, Store } from '../../common';
import {
  PerformanceType,
  PerformanceReportData,
  MonitorType,
} from '../../types';

function setPerformanceData(store: InstanceType<typeof Store>, entry) {
  if (entry.name) {
    let data: PerformanceReportData = {
      type: MonitorType.PERFORMANCE,
      secondType: PerformanceType[entry.name],
      time: getNowTime(),
      value: entry.startTime.toFixed(2),
    };
    store.set(PerformanceType[entry.name], data);
  }
}

function getEntriesByFP(store: InstanceType<typeof Store>) {
  let FP = performance.getEntriesByName('first-paint')[0];
  let FCP = performance.getEntriesByName('first-contentful-paint')[0];
  setPerformanceData(store, FP);
  setPerformanceData(store, FCP);
}

export function getFP(store: InstanceType<typeof Store>) {
  if (!isPerformanceObserver()) {
    if (!isPerformance()) {
      throw new Error('浏览器不支持performance');
    } else {
      onLoaded(() => {
        getEntriesByFP(store);
      });
    }
  } else {
    const entryHandler = (entry: PerformanceEntry): void => {
      if (ob) {
        ob.disconnect();
      }
      setPerformanceData(store, entry);
    };

    // first-paint first-contentful-paint
    const ob: PerformanceObserver = observe('paint', entryHandler);
  }
}
