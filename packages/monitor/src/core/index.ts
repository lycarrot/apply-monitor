import type { InitOptions } from '../types'
import { defaultOptions } from '../config'
import Error from './error'
import Performance from './performance'

class Monitor {
  constructor(options: InitOptions) {
    this.init(options)
  }
  init(options: InitOptions): void {
    if (!this.isSetCondition(options)) return
    this.setDefault(options)
    if (options.isCollectPer) {
      new Performance(options)
    }
    if (options.isCollectErr) {
      new Error(options)
    }
  }
  isSetCondition(options: InitOptions) {
    if (!options.url) {
      console.error('上报url必传')
      return false
    }
    if (!options.project) {
      console.error('项目project必传')
      return false
    }
    if (!options.version) {
      console.error('项目版本号必传')
      return false
    }
    if (options.isVue && !options.vue) {
      console.log('如果isVue为true时,请在vue字段上传入Vue')
      return false
    }
    return true
  }
  setDefault(options: InitOptions) {
    Object.keys(defaultOptions).forEach((key: string) => {
      if (options[key] == null) {
        options[key] = defaultOptions[key]
      }
    })
  }
}

export default Monitor
