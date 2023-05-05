import { isPerformance, isNavigator, switchToMB } from '../../utils'
import { PerformanceType, SetStore } from '../../types'

// 获取内存占用空间

export function getMemory(setStore: SetStore) {
  if (!isPerformance()) {
    throw new Error('浏览器不支持Performance')
  }
  if (!isNavigator()) {
    throw new Error('浏览器不支持Navigator')
  }
  const value = {
    deviceMemory: 'deviceMemory' in navigator ? navigator['deviceMemory'] : 0,
    hardwareConcurrency:
      'hardwareConcurrency' in navigator ? navigator['hardwareConcurrency'] : 0,
    //   内存大小限制
    jsHeapSizeLimit:
      'memory' in performance
        ? switchToMB(performance['memory']['jsHeapSizeLimit'])
        : 0,
    // 可使用的内存大小
    totalJSHeapSize:
      'memory' in performance
        ? switchToMB(performance['memory']['totalJSHeapSize'])
        : 0,
    //   JS 对象占用的内存数
    usedJSHeapSize:
      'memory' in performance
        ? switchToMB(performance['memory']['usedJSHeapSize'])
        : 0,
  }
  setStore(PerformanceType.MRY, value)
}
