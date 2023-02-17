import { isPerformanceObserver, isPerformance } from '../../utils';
import { observe, Store } from '../../common';
import { getNowTime } from '../../utils';
import {
  PerformanceType,
  PerformanceReportData,
  MonitorType,
} from '../../types';
export function getFP(store: InstanceType<typeof Store>) {
  if (!isPerformanceObserver()) {
  } else {
    const entryHandler = (entry: PerformanceEntry): void => {
      if (entry.name) {
        console.log(entry);
        let data: PerformanceReportData = {
          type: MonitorType.PERFORMANCE,
          secondType: PerformanceType[entry.name],
          time: getNowTime(),
          value: entry.startTime.toFixed(2),
        };
        store.set(PerformanceType[entry.name], data);
      }
    };
    // first-paint first-contentful-paint
    observe('paint', entryHandler);
  }
}
