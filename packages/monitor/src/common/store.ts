import { PerformanceReportData, PerformanceType, StoreData } from '../types'
class Store {
  store: Map<PerformanceType, PerformanceReportData>
  constructor() {
    this.store = new Map<PerformanceType, PerformanceReportData>()
  }
  get(key: PerformanceType): PerformanceReportData {
    return this.store.get(key)
  }
  set(key: PerformanceType, val: PerformanceReportData) {
    this.store.set(key, val)
  }
  clear() {
    this.store.clear()
  }
  getValues(): StoreData {
    return Array.from(this.store).reduce((obj, [key, value]) => {
      obj[key] = value
      return obj
    }, {})
  }
}

export { Store }
