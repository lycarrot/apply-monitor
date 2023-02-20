import {
  PerformanceReportData,
  MonitorType,
  PerformanceType,
} from '../../types';
import { getNowTime } from '../../utils';
import { Store } from '../../common';

type WindowInfo = {
  host: string;
  hostname: string;
  href: string;
  protocol: string;
  origin: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  userAgent?: string;
  screenResolution: string;
};

let pageInfo: string = 'pageInfo';
export function getPageInfo(store: InstanceType<typeof Store>) {
  if (!window.location) {
    throw new Error('浏览器不支持location');
    return;
  }

  const {
    host,
    hostname,
    href,
    protocol,
    origin,
    port,
    pathname,
    search,
    hash,
  } = location;
  const { width, height } = window.screen;
  let windowInfo: WindowInfo = {
    host,
    hostname,
    href,
    protocol,
    origin,
    port,
    pathname,
    search,
    hash,
    screenResolution: `${width}*${height}`,
  };
  let data: PerformanceReportData = {
    type: MonitorType.PERFORMANCE,
    secondType: PerformanceType[pageInfo],
    time: getNowTime(),
    value: windowInfo,
  };
  store.set(PerformanceType[pageInfo], data);
}
