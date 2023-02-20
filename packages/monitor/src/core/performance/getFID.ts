import { isPerformanceObserver, getNowTime, onHidden } from '../../utils';
import { observe, Store } from '../../common';
import {
  PerformanceType,
  PerformanceReportData,
  MonitorType,
} from '../../types';

function setPerformanceData(store: InstanceType<typeof Store>, entry) {
  if (entry.entryType) {
    let data: PerformanceReportData = {
      type: MonitorType.PERFORMANCE,
      secondType: PerformanceType[entry.entryType],
      time: getNowTime(),
      value: entry.startTime.toFixed(2),
      event: entry.name,
    };
    store.set(PerformanceType[entry.entryType], data);
  }
}

export function getFID(store: InstanceType<typeof Store>) {
  if (!isPerformanceObserver()) {
    throw new Error('浏览器不支持PerformanceObserver');
  } else {
    const entryHandler = (entry: PerformanceEventTiming) => {
      if (ob) {
        ob.disconnect();
      }
      setPerformanceData(store, entry);
    };
    const ob: PerformanceObserver = observe('first-input', entryHandler);
  }
}
