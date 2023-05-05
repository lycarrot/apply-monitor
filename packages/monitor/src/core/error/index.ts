import {
  InitOptions,
  MonitorType,
  ErrorType,
  JsEventTarget,
  AjaxEventTarget,
  Level,
  // VueInstance,
  // ViewModel,
  RejectReason,
  ReportValue,
} from '../../types'
import { ReportInfo } from '../../common'
import { getLines, getNowTime } from '../../utils'
class Error {
  reportInfo: ReportInfo
  constructor(options: InitOptions) {
    this.init(options)
    this.reportInfo = new ReportInfo(options)
  }
  init(options: InitOptions) {
    this.handleJS()
    this.handleAajxError()
    if (options.isVue) {
      this.handleVue(options.vue)
    }
  }
  report(secondType: ErrorType, value: ReportValue) {
    console.log('value', value)
    this.reportInfo.send(
      {
        type: MonitorType.ERROR,
        secondType: secondType,
        level: Level.ERROR,
        time: getNowTime(),
        value: value,
      },
      true
    )
  }
  // js错误监控
  handleJS() {
    window.addEventListener(
      'error',
      (event: ErrorEvent) => {
        const target = event.target as JsEventTarget
        if (target && (target.src || target.href)) {
          this.report(ErrorType.RESOURCE, {
            message: '资源加载异常了',
            filename: target.src || target.href,
            tagName: target.tagName,
          })
        } else {
          const { message, filename, lineno, colno } = event
          this.report(ErrorType.JS, {
            message: message,
            filename: filename,
            row: lineno,
            col: colno,
            stack: event.error && getLines(event.error.stack),
          })
        }
      },
      true
    )
    // promise错误捕捉
    window.addEventListener(
      'unhandledrejection',
      (event: PromiseRejectionEvent) => {
        let message: string
        let filename: string
        let line: number | string = 0
        let column: number | string = 0
        let stack = ''
        const reason: string | RejectReason = event.reason
        if (typeof reason === 'string') {
          message = reason
        } else if (typeof reason === 'object') {
          message = reason.message
          if (reason.stack) {
            const matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/)
            filename = matchResult[1]
            line = matchResult[2]
            column = matchResult[3]
          }
          stack = getLines(reason.stack)
        }
        this.report(ErrorType.PROMISE, {
          message,
          filename,
          row: line,
          col: column,
          stack,
        })
      },
      true
    )
  }
  // vue错误监控;
  handleVue(Vue) {
    Vue.config.errorHandler = (error, vm, info) => {
      let componentName: string
      if (Object.prototype.toString.call(vm) === '[object Object]') {
        componentName = vm._isVue
          ? vm.$options.name || vm.$options._componentTag
          : vm.name
      }
      const value: ReportValue = {
        message: error.message,
        info: info,
        componentName: componentName,
        stack: error.stack,
      }
      // 匹配到代码报错出现位置
      const reg = /.js\:(\d+)\:(\d+)/i
      const codePos = error.stack.match(reg)
      if (codePos.length) {
        value.row = parseInt(codePos[1])
        value.col = parseInt(codePos[2])
      }
      this.report(ErrorType.VUE, value)
    }
  }
  //ajax请求错误
  handleAajxError() {
    if (!window.XMLHttpRequest) {
      return
    }
    const xhrSend = XMLHttpRequest.prototype.send
    XMLHttpRequest.prototype.send = function (...args): void {
      if (this.addEventListener) {
        this.addEventListener('error', _handleEvent)
        this.addEventListener('load', _handleEvent)
        this.addEventListener('abort', _handleEvent)
      } else {
        const tempStateChange = this.onreadystatechange
        this.onreadystatechange = function (event: Event) {
          tempStateChange.apply(this, args)
          if (this.readyState === 4) {
            _handleEvent(event)
          }
        }
      }
      return xhrSend.apply(this, args)
    }

    const _handleEvent = (event: Event) => {
      try {
        if (!event) return
        const target = event.currentTarget as AjaxEventTarget
        if (target && target.status !== 200) {
          this.report(ErrorType.AJAX, {
            message: target.response,
            status: target.status,
            statusText: target.statusText,
            url: target.responseURL,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export default Error
