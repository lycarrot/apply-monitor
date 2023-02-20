import {
  isPerformance,
  isNavigator,
  getNowTime,
  switchToMB,
} from '../../utils';
import {
  MonitorType,
  PerformanceType,
  PerformanceReportData,
} from '../../types';
import { Store } from '../../common';

let type = 'memory';

export function getMemory(store: InstanceType<typeof Store>) {
  if (!isPerformance()) {
    throw new Error('浏览器不支持Performance');
    return;
  }
  if (!isNavigator()) {
    throw new Error('浏览器不支持Navigator');
    return;
  }
  let value = {
    deviceMemory: 'deviceMemory' in navigator ? navigator['deviceMemory'] : 0,
    hardwareConcurrency:
      'hardwareConcurrency' in navigator ? navigator['hardwareConcurrency'] : 0,
    //   内存大小限制
    jsHeapSizeLimit:
      'memory' in performance
        ? switchToMB(performance['memory']['jsHeapSizeLimit'])
        : 0,
    // 可使用的内存大小
    totalJSHeapSize:
      'memory' in performance
        ? switchToMB(performance['memory']['totalJSHeapSize'])
        : 0,
    //   JS 对象占用的内存数
    usedJSHeapSize:
      'memory' in performance
        ? switchToMB(performance['memory']['usedJSHeapSize'])
        : 0,
  };
  let data: PerformanceReportData = {
    type: MonitorType.PERFORMANCE,
    secondType: PerformanceType[type],
    time: getNowTime(),
    value: value,
  };
  console.log('value', value);
  store.set(PerformanceType[type], data);
}
