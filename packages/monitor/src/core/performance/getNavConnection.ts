import { getNowTime, isNavigator } from '../../utils';
import { Store } from '../../common';
import {
  PerformanceType,
  PerformanceReportData,
  MonitorType,
} from '../../types';
type Connection = {
  downlink?: number;
  effectiveType?: string;
  rtt?: number;
};
export function getNavConnection(store: InstanceType<typeof Store>) {
  if (!isNavigator()) {
    throw new Error('浏览器不支持Navigator');
  } else {
    const connection: Connection = (
      'connection' in navigator ? navigator['connection'] : {}
    ) as Connection;
    let data: PerformanceReportData = {
      type: MonitorType.PERFORMANCE,
      secondType: PerformanceType['nav-connecttion'],
      time: getNowTime(),
      value: {
        downlink: connection.downlink,
        effectiveType: connection.effectiveType,
        rtt: connection.rtt,
      },
    };
    store.set(PerformanceType['nav-connecttion'], data);
  }
}
