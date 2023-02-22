import { isNavigator } from '../../utils';
import { PerformanceType, NavConnection, SetStore } from '../../types';

// 获取网络环境信息

export function getNavConnection(setStore: SetStore) {
  if (!isNavigator()) {
    throw new Error('浏览器不支持Navigator');
  } else {
    const connection: NavConnection =
      'connection' in navigator ? navigator['connection'] : {};
    let value = {
      downlink: connection.downlink,
      effectiveType: connection.effectiveType,
      rtt: connection.rtt,
    };
    setStore(PerformanceType.NC, value);
  }
}
