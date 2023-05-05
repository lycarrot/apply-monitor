import { getNowTime, onLoaded, isIncludeEle, isInScreen } from '../../utils'
import { PerformanceType, NodeItem, SourceItem, SetStore } from '../../types'
import { isLCPDone } from './getLCP'

//first-screen-paint 首屏渲染时间

let entries: {
  startTime: number
  children: NodeItem[]
}[] = []

let isOnLoaded = false

onLoaded(() => {
  isOnLoaded = true
})

let timer
function checkDOMChange(setStore: SetStore) {
  clearTimeout(timer)
  timer = setTimeout(() => {
    // 等 load、lcp 事件触发后并且 DOM 树不再变化时，计算首屏渲染时间
    if (isOnLoaded && isLCPDone()) {
      setStore(PerformanceType.FSP, getRenderTime())
      entries = null
    } else {
      checkDOMChange(setStore)
    }
  }, 500)
}

function getRenderTime() {
  let startTime = 0
  entries.forEach((entry) => {
    for (const node of entry.children) {
      if (
        isInScreen(node) &&
        entry.startTime > startTime &&
        needToCalculate(node)
      ) {
        startTime = entry.startTime
        break
      }
    }
  })

  // 需要和当前页面所有加载图片的时间做对比，取最大值
  // 图片请求时间要小于 startTime，响应结束时间要大于 startTime
  performance.getEntriesByType('resource').forEach((item: SourceItem) => {
    if (
      item.initiatorType === 'img' &&
      item.fetchStart < startTime &&
      item.responseEnd > startTime
    ) {
      startTime = item.responseEnd
    }
  })

  return startTime
}

function needToCalculate(node) {
  // 隐藏的元素不用计算
  if (window.getComputedStyle(node).display === 'none') return false

  // 用于统计的图片不用计算
  if (node.tagName === 'IMG' && node.width < 2 && node.height < 2) {
    return false
  }

  return true
}

export function getFSP(setStore: SetStore) {
  if (!MutationObserver) {
    throw new Error('浏览器不支持MutationObserver')
  }

  const next = window.requestAnimationFrame ? requestAnimationFrame : setTimeout
  const ignoreDOMList = ['STYLE', 'SCRIPT', 'LINK', 'META']
  const ob = new MutationObserver((mutationList) => {
    checkDOMChange(setStore)
    next(() => {
      entry.startTime = performance.now()
    })
    const entry = {
      startTime: 0,
      children: [],
    }
    for (const mutation of mutationList) {
      if (mutation.addedNodes.length) {
        const nodeLists: NodeItem[] = Array.from(
          mutation.addedNodes as NodeList
        )
        for (const node of nodeLists) {
          if (
            node.nodeType === 1 &&
            !ignoreDOMList.includes(node?.tagName) &&
            !isIncludeEle(node, entry.children)
          ) {
            entry.children.push(node)
          }
        }
      }
    }
    if (entry.children.length) {
      entries.push(entry)
    }
  })

  ob.observe(document, {
    childList: true,
    subtree: true,
  })
}
