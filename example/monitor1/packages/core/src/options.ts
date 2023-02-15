import { InitOptions } from '@zyf2e/monitor-types'
import { generateUUID, toStringValidateOption, validateOption, _support, setSilentFlag, logger } from '@zyf2e/monitor-utils'
import { breadcrumb } from './breadcrumb'
import { transportData } from './transportData'
export class Options {
  beforeAppAjaxSend: Function = () => {}
  enableTraceId: Boolean
  filterXhrUrlRegExp: RegExp
  includeHttpUrlTraceIdRegExp: RegExp
  traceIdFieldName = 'Trace-Id'
  throttleDelayTime = 0
  maxDuplicateCount = 2
  // wx-mini
  appOnLaunch: Function = () => {}
  appOnShow: Function = () => {}
  onPageNotFound: Function = () => {}
  appOnHide: Function = () => {}
  pageOnUnload: Function = () => {}
  pageOnShow: Function = () => {}
  pageOnHide: Function = () => {}
  onShareAppMessage: Function = () => {}
  onShareTimeline: Function = () => {}
  onTabItemTap: Function = () => {}
  // need return opitons，so defaul value is undefined
  wxNavigateToMiniProgram: Function
  triggerWxEvent: Function = () => {}
  onRouteChange?: Function

  constructor() {
    this.enableTraceId = false
  }
  bindOptions(options: InitOptions = {}): void {
    const {
      beforeAppAjaxSend,
      enableTraceId,
      filterXhrUrlRegExp,
      traceIdFieldName,
      throttleDelayTime,
      includeHttpUrlTraceIdRegExp,
      appOnLaunch,
      appOnShow,
      appOnHide,
      pageOnUnload,
      pageOnShow,
      pageOnHide,
      onPageNotFound,
      onShareAppMessage,
      onShareTimeline,
      onTabItemTap,
      wxNavigateToMiniProgram,
      triggerWxEvent,
      maxDuplicateCount,
      onRouteChange
    } = options
    validateOption(beforeAppAjaxSend, 'beforeAppAjaxSend', 'function') && (this.beforeAppAjaxSend = beforeAppAjaxSend)
    // wx-mini hooks
    validateOption(appOnLaunch, 'appOnLaunch', 'function') && (this.appOnLaunch = appOnLaunch)
    validateOption(appOnShow, 'appOnShow', 'function') && (this.appOnShow = appOnShow)
    validateOption(appOnHide, 'appOnHide', 'function') && (this.appOnHide = appOnHide)
    validateOption(pageOnUnload, 'pageOnUnload', 'function') && (this.pageOnUnload = pageOnUnload)
    validateOption(pageOnShow, 'pageOnShow', 'function') && (this.pageOnShow = pageOnShow)
    validateOption(pageOnHide, 'pageOnHide', 'function') && (this.pageOnHide = pageOnHide)
    validateOption(onPageNotFound, 'onPageNotFound', 'function') && (this.onPageNotFound = onPageNotFound)
    validateOption(onShareAppMessage, 'onShareAppMessage', 'function') && (this.onShareAppMessage = onShareAppMessage)
    validateOption(onShareTimeline, 'onShareTimeline', 'function') && (this.onShareTimeline = onShareTimeline)
    validateOption(onTabItemTap, 'onTabItemTap', 'function') && (this.onTabItemTap = onTabItemTap)
    validateOption(wxNavigateToMiniProgram, 'wxNavigateToMiniProgram', 'function') &&
      (this.wxNavigateToMiniProgram = wxNavigateToMiniProgram)
    validateOption(triggerWxEvent, 'triggerWxEvent', 'function') && (this.triggerWxEvent = triggerWxEvent)
    // browser hooks
    validateOption(onRouteChange, 'onRouteChange', 'function') && (this.onRouteChange = onRouteChange)

    validateOption(enableTraceId, 'enableTraceId', 'boolean') && (this.enableTraceId = enableTraceId)
    validateOption(traceIdFieldName, 'traceIdFieldName', 'string') && (this.traceIdFieldName = traceIdFieldName)
    validateOption(throttleDelayTime, 'throttleDelayTime', 'number') && (this.throttleDelayTime = throttleDelayTime)
    validateOption(maxDuplicateCount, 'maxDuplicateCount', 'number') && (this.maxDuplicateCount = maxDuplicateCount)
    toStringValidateOption(filterXhrUrlRegExp, 'filterXhrUrlRegExp', '[object RegExp]') && (this.filterXhrUrlRegExp = filterXhrUrlRegExp)
    toStringValidateOption(includeHttpUrlTraceIdRegExp, 'includeHttpUrlTraceIdRegExp', '[object RegExp]') &&
      (this.includeHttpUrlTraceIdRegExp = includeHttpUrlTraceIdRegExp)
  }
}

const options = _support.options || (_support.options = new Options())

export function setTraceId(httpUrl: string, callback: (headerFieldName: string, traceId: string) => void) {
  const { includeHttpUrlTraceIdRegExp, enableTraceId } = options
  if (enableTraceId && includeHttpUrlTraceIdRegExp && includeHttpUrlTraceIdRegExp.test(httpUrl)) {
    const traceId = generateUUID()
    callback(options.traceIdFieldName, traceId)
  }
}

/**
 * init core methods
 * @param paramOptions
 */
export function initOptions(paramOptions: InitOptions = {}) {
  setSilentFlag(paramOptions)
  breadcrumb.bindOptions(paramOptions)
  logger.bindOptions(paramOptions.debug)
  transportData.bindOptions(paramOptions)
  options.bindOptions(paramOptions)
}

export { options }
