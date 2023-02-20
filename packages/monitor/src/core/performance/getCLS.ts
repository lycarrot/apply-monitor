import { isPerformanceObserver, getNowTime, onHidden } from '../../utils';
import { observe, Store } from '../../common';
import {
  PerformanceType,
  PerformanceReportData,
  MonitorType,
  LayoutShift,
} from '../../types';

let value: number = 0;
let typeName = 'layout-shift';
export function getCLS(store: InstanceType<typeof Store>) {
  if (!isPerformanceObserver()) {
    throw new Error('浏览器不支持PerformanceObserver');
  } else {
    const entryHandler = (entry: LayoutShift) => {
      if (!entry.hadRecentInput) {
        value += entry.value;
      }
    };
    const ob: PerformanceObserver = observe(typeName, entryHandler);

    const stopListening = () => {
      if (ob?.takeRecords) {
        ob.takeRecords().map((entry: LayoutShift) => {
          if (!entry.hadRecentInput) {
            value += entry.value;
          }
        });
      }
      ob?.disconnect();
      let data: PerformanceReportData = {
        type: MonitorType.PERFORMANCE,
        secondType: PerformanceType[typeName],
        time: getNowTime(),
        value: value.toFixed(2),
      };
      store.set(PerformanceType[typeName], data);
    };
    onHidden(stopListening, true);
  }
}
