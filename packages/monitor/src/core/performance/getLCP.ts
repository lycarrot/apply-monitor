import { isPerformanceObserver, getNowTime } from '../../utils';
import { observe } from '../../common';
import { PerformanceType, SetStore } from '../../types';

// largest-contentful-paint 从页面加载开始到最大文本块或图像元素在屏幕上完成渲染的时间

let lcpDone = false;
export function isLCPDone() {
  return lcpDone;
}

export function getLCP(setStore: SetStore) {
  if (!isPerformanceObserver()) {
    lcpDone = true;
    throw new Error('浏览器不支持PerformanceObserver');
  } else {
    const entryHandler = (entry: PerformanceEntry): void => {
      lcpDone = true;
      if (ob) {
        ob.disconnect();
      }
      setStore(PerformanceType.LCP, entry.startTime.toFixed(2));
    };
    const ob: PerformanceObserver = observe(
      'largest-contentful-paint',
      entryHandler
    );
  }
}
