import { isPerformanceObserver, isPerformance, onLoaded } from '../../utils'
import { observe } from '../../common'
import { PerformanceType, SetStore } from '../../types'

// first-paint  从页面加载开始到第一个像素绘制到屏幕上的时间
//  first-contentful-paint 从页面加载开始到页面内容的任何部分在屏幕上完成渲染的时间

function getEntriesByFP(setStore: SetStore) {
  const entryFP: PerformanceEntry =
    performance.getEntriesByName('first-paint')[0]
  const entryFCP: PerformanceEntry = performance.getEntriesByName(
    'first-contentful-paint'
  )[0]
  setStore(PerformanceType.FP, entryFP.startTime.toFixed(2))
  setStore(PerformanceType.FCP, entryFCP.startTime.toFixed(2))
}

export function getFP(setStore: SetStore) {
  if (!isPerformanceObserver()) {
    if (!isPerformance()) {
      throw new Error('浏览器不支持performance')
    } else {
      onLoaded(() => {
        getEntriesByFP(setStore)
      })
    }
  } else {
    const entryHandler = (entry: PerformanceEntry): void => {
      if (ob) {
        ob.disconnect()
      }
      setStore(PerformanceType.FP, entry.startTime.toFixed(2))
    }
    const ob: PerformanceObserver = observe('paint', entryHandler)
  }
}
