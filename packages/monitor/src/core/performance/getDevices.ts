import { PerformanceType, SetStore, DevicesInfo } from '../../types';

export function getDevices(setStore: SetStore) {
  if (!window.location) {
    throw new Error('浏览器不支持location');
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

  let info: DevicesInfo = {
    host,
    hostname,
    href,
    protocol,
    origin,
    port,
    pathname,
    search,
    hash,
    userAgent: 'userAgent' in navigator ? navigator.userAgent : '',
    screenResolution: `${width}*${height}`,
  };

  setStore(PerformanceType.DICE, info);
}
