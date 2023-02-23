import {
  InitOptions,
  MonitorType,
  ErrorType,
  JsEventTarget,
  AjaxEventTarget,
  Level,
  VueInstance,
  ViewModel,
  RejectReason,
  ReportValue,
} from '../../types';
import { ReportInfo } from '../../common';
import { getLines, getNowTime } from '../../utils';

class Error {
  reportInfo: ReportInfo;
  constructor(options: InitOptions) {
    this.init(options);
    this.reportInfo = new ReportInfo(options);
  }
  init(options: InitOptions) {
    this.handleJS();
    if (options.isVue) {
      this.handleVue(options.vue);
    }
    if (options.sendWay == 'ajax') {
      this.handleAajxError();
    }
  }
  report(secondType: ErrorType, value: ReportValue) {
    this.reportInfo.send({
      type: MonitorType.ERROR,
      secondType: secondType,
      level: Level.ERROR,
      time: getNowTime(),
      value: value,
    });
  }
  // js错误监控
  handleJS() {
    window.addEventListener(
      'error',
      (event: ErrorEvent) => {
        let target = event.target as JsEventTarget;
        if (target && (target.src || target.href)) {
          this.report(ErrorType.JS, {
            message: '资源加载异常了',
            filename: target.src || target.href,
            tagName: target.tagName,
          });
        } else {
          let { message, filename, lineno, colno } = event;
          this.report(ErrorType.JS, {
            message: message,
            filename: filename,
            position: `${lineno}:${colno}`,
            stack: getLines(event.error.stack),
          });
        }
      },
      true
    );

    window.addEventListener(
      'unhandledrejection',
      (event: PromiseRejectionEvent) => {
        let message: string;
        let filename: string;
        let line: number | string = 0;
        let column: number | string = 0;
        let stack: string = '';
        let reason: string | RejectReason = event.reason;
        if (typeof reason === 'string') {
          message = reason;
        } else if (typeof reason === 'object') {
          message = reason.message;
          if (reason.stack) {
            let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
            filename = matchResult[1];
            line = matchResult[2];
            column = matchResult[3];
          }
          stack = getLines(reason.stack);
        }
        this.report(ErrorType.PROMISE, {
          message,
          filename,
          position: `${line}:${column}`,
          stack,
        });
      },
      true
    );
  }
  // vue错误监控;
  handleVue(Vue: VueInstance) {
    Vue.config.errorHandler = (error: Error, vm: ViewModel, info: string) => {
      let componentName: string;
      if (Object.prototype.toString.call(vm) === '[object Object]') {
        componentName = vm._isVue
          ? vm.$options.name || vm.$options._componentTag
          : vm.name;
      }
      this.report(ErrorType.VUE, {
        message: error.message,
        info: info,
        componentName: componentName,
        stack: error.stack,
      });
    };
  }
  //ajax请求错误
  handleAajxError() {
    if (!window.XMLHttpRequest) {
      return;
    }
    let xhrSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function (): void {
      if (this.addEventListener) {
        this.addEventListener('error', _handleEvent);
        this.addEventListener('load', _handleEvent);
        this.addEventListener('abort', _handleEvent);
      } else {
        let tempStateChange = this.onreadystatechange;
        this.onreadystatechange = function (event: Event) {
          tempStateChange.apply(this, arguments);
          if (this.readyState === 4) {
            _handleEvent(event);
          }
        };
      }
      return xhrSend.apply(this, arguments);
    };

    let _handleEvent = (event: Event) => {
      try {
        if (!event) return;
        let target = event.currentTarget as AjaxEventTarget;
        if (target && target.status !== 200) {
          this.report(ErrorType.AJAX, {
            message: target.response,
            status: target.status,
            statusText: target.statusText,
            url: target.responseURL,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  }
}

export default Error;
