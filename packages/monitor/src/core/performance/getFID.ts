import { isPerformanceObserver } from '../../utils'
import { observe } from '../../common'
import { PerformanceType, SetStore } from '../../types'
// first-input 测量用户首次与您的站点交互时的时间（即，当他们单击链接，点击按钮或使用自定义的JavaScript驱动控件时）到浏览器实际能够的时间回应这种互动。

export function getFID(setStore: SetStore) {
  if (!isPerformanceObserver()) {
    throw new Error('浏览器不支持PerformanceObserver')
  } else {
    const entryHandler = (entry: PerformanceEventTiming) => {
      if (ob) {
        ob.disconnect()
      }
      setStore(PerformanceType.FID, {
        value: entry.startTime.toFixed(2),
        event: entry.name,
      })
    }
    const ob: PerformanceObserver = observe(PerformanceType.FID, entryHandler)
  }
}
