import {
  isPerformanceObserver,
  isPerformance,
  getNowTime,
  onLoaded,
} from '../../utils';
import { Store } from '../../common';
import {
  PerformanceType,
  PerformanceReportData,
  MonitorType,
} from '../../types';
import { isLCPDone } from './getLCP';

interface NodeItem extends Node {
  tagName?: string;
}

let entries: {
  startTime: number;
  children: NodeItem[];
}[] = [];

let entryType: string = 'first-screen-paint';

let isOnLoaded = false;
onLoaded(() => {
  isOnLoaded = true;
});

let timer;
let observer;
function checkDOMChange(store: InstanceType<typeof Store>) {
  clearTimeout(timer);
  timer = setTimeout(() => {
    // 等 load、lcp 事件触发后并且 DOM 树不再变化时，计算首屏渲染时间
    if (isOnLoaded && isLCPDone()) {
      observer && observer.disconnect();
      let data: PerformanceReportData = {
        type: MonitorType.PERFORMANCE,
        secondType: PerformanceType[entryType],
        time: getNowTime(),
        value: getRenderTime(),
      };
      store.set(PerformanceType[entryType], data);
      entries = null;
    } else {
      checkDOMChange(store);
    }
  }, 500);
}

function getRenderTime() {
  let startTime = 0;
  entries.forEach((entry) => {
    for (const node of entry.children) {
      if (
        isInScreen(node) &&
        entry.startTime > startTime &&
        needToCalculate(node)
      ) {
        startTime = entry.startTime;
        break;
      }
    }
  });

  // 需要和当前页面所有加载图片的时间做对比，取最大值
  // 图片请求时间要小于 startTime，响应结束时间要大于 startTime
  performance.getEntriesByType('resource').forEach((item: PerformanceEntry) => {
    if (
      item.initiatorType === 'img' &&
      item.fetchStart < startTime &&
      item.responseEnd > startTime
    ) {
      startTime = item.responseEnd;
    }
  });

  return startTime;
}

function needToCalculate(node) {
  // 隐藏的元素不用计算
  if (window.getComputedStyle(node).display === 'none') return false;

  // 用于统计的图片不用计算
  if (node.tagName === 'IMG' && node.width < 2 && node.height < 2) {
    return false;
  }

  return true;
}

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

// dom 对象是否在屏幕内
function isInScreen(dom) {
  const rectInfo = dom.getBoundingClientRect();
  if (
    rectInfo.left >= 0 &&
    rectInfo.left < viewportWidth &&
    rectInfo.top >= 0 &&
    rectInfo.top < viewportHeight
  ) {
    return true;
  }
}

export function getFSP(store: InstanceType<typeof Store>) {
  if (!MutationObserver) {
    throw new Error('浏览器不支持MutationObserver');
  }

  const next = window.requestAnimationFrame
    ? requestAnimationFrame
    : setTimeout;
  const ignoreDOMList = ['STYLE', 'SCRIPT', 'LINK', 'META'];
  const ob = new MutationObserver((mutationList) => {
    checkDOMChange(store);
    next(() => {
      entry.startTime = performance.now();
    });
    const entry = {
      startTime: 0,
      children: [],
    };
    for (const mutation of mutationList) {
      if (mutation.addedNodes.length) {
        let nodeLists: NodeItem[] = Array.from(mutation.addedNodes as NodeList);
        for (const node of nodeLists) {
          if (
            node.nodeType === 1 &&
            !ignoreDOMList.includes(node?.tagName) &&
            !isIncludeEle(node, entry.children)
          ) {
            entry.children.push(node);
          }
        }
      }
    }
    if (entry.children.length) {
      entries.push(entry);
    }
  });

  ob.observe(document, {
    childList: true,
    subtree: true,
  });
}
