import { isPerformanceObserver, onHidden } from '../../utils'
import { observe } from '../../common'
import { PerformanceType, LayoutShift, SetStore } from '../../types'

// layout-shift 从页面加载开始和其生命周期状态变为隐藏期间发生的所有意外布局偏移的累积分数

let value = 0

export function getCLS(setStore: SetStore) {
  if (!isPerformanceObserver()) {
    throw new Error('浏览器不支持PerformanceObserver')
  } else {
    const entryHandler = (entry: LayoutShift) => {
      if (!entry.hadRecentInput) {
        value += entry.value
      }
    }

    const ob: PerformanceObserver = observe(PerformanceType.CLS, entryHandler)

    const stopListening = () => {
      if (ob?.takeRecords) {
        ob.takeRecords().map((entry: LayoutShift) => {
          if (!entry.hadRecentInput) {
            value += entry.value
          }
        })
      }
      ob?.disconnect()

      setStore(PerformanceType.CLS, value.toFixed(2))
    }

    onHidden(stopListening, true)
  }
}
