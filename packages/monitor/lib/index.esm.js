var defaultOptions = {
  url: '//127.0.0.1:8000/api/collect/info/detail',
  sendWay: 'sendBeacon',
  isCollectErr: true,
  isCollectPer: true,
  isCollectBehavior: true,
}

var MonitorType
;(function (MonitorType) {
  MonitorType['ERROR'] = 'error'
  MonitorType['PERFORMANCE'] = 'performance'
  MonitorType['BEHAVIOR'] = 'behavior'
})(MonitorType || (MonitorType = {}))
var Level
;(function (Level) {
  Level['ERROR'] = 'error'
  Level['WARN'] = 'warn'
  Level['INFO'] = 'info'
})(Level || (Level = {}))

var ErrorType
;(function (ErrorType) {
  ErrorType['JS'] = 'js_error'
  ErrorType['RESOURCE'] = 'resource_error'
  ErrorType['VUE'] = 'vue_error'
  ErrorType['PROMISE'] = 'promise_error'
  ErrorType['AJAX'] = 'ajax_error'
})(ErrorType || (ErrorType = {}))

var PerformanceType
;(function (PerformanceType) {
  PerformanceType['FP'] = 'first-paint'
  PerformanceType['FCP'] = 'first-contentful-paint'
  PerformanceType['LCP'] = 'largest-contentful-paint'
  PerformanceType['CLS'] = 'layout-shift'
  PerformanceType['FID'] = 'first-input'
  PerformanceType['FSP'] = 'first-screen-paint'
  PerformanceType['NC'] = 'nav-connecttion'
  PerformanceType['NAV'] = 'navigation'
  PerformanceType['MRY'] = 'memory'
  PerformanceType['DICE'] = 'devices'
})(PerformanceType || (PerformanceType = {}))

var BehaviorType
;(function (BehaviorType) {
  BehaviorType['PV'] = 'pv'
  BehaviorType['VJ'] = 'vue-jump'
  BehaviorType['PD'] = 'page-duration'
})(BehaviorType || (BehaviorType = {}))

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues
const rnds8 = new Uint8Array(16)
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues =
      typeof crypto !== 'undefined' &&
      crypto.getRandomValues &&
      crypto.getRandomValues.bind(crypto)

    if (!getRandomValues) {
      throw new Error(
        'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported'
      )
    }
  }

  return getRandomValues(rnds8)
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = []

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1))
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (
    byteToHex[arr[offset + 0]] +
    byteToHex[arr[offset + 1]] +
    byteToHex[arr[offset + 2]] +
    byteToHex[arr[offset + 3]] +
    '-' +
    byteToHex[arr[offset + 4]] +
    byteToHex[arr[offset + 5]] +
    '-' +
    byteToHex[arr[offset + 6]] +
    byteToHex[arr[offset + 7]] +
    '-' +
    byteToHex[arr[offset + 8]] +
    byteToHex[arr[offset + 9]] +
    '-' +
    byteToHex[arr[offset + 10]] +
    byteToHex[arr[offset + 11]] +
    byteToHex[arr[offset + 12]] +
    byteToHex[arr[offset + 13]] +
    byteToHex[arr[offset + 14]] +
    byteToHex[arr[offset + 15]]
  ).toLowerCase()
}

const randomUUID =
  typeof crypto !== 'undefined' &&
  crypto.randomUUID &&
  crypto.randomUUID.bind(crypto)
var native = {
  randomUUID,
}

function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID()
  }

  options = options || {}
  const rnds = options.random || (options.rng || rng)() // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = (rnds[6] & 0x0f) | 0x40
  rnds[8] = (rnds[8] & 0x3f) | 0x80 // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i]
    }

    return buf
  }

  return unsafeStringify(rnds)
}

function formatParams(obj) {
  var strArr = []
  Object.keys(obj).forEach(function (key) {
    strArr.push(
      ''
        .concat(encodeURIComponent(key), '=')
        .concat(encodeURIComponent(obj[key]))
    )
  })
  return strArr.join('&')
}
function getLines(stack) {
  return stack
    .split('\n')
    .slice(1)
    .map(function (item) {
      return item.replace(/^\s+at\s+/g, '')
    })
    .join('^')
}
function getNowTime() {
  return Date.now()
}
function switchToMB(bytes) {
  if (typeof bytes !== 'number') {
    return null
  }
  return parseFloat((bytes / Math.pow(1024, 2)).toFixed(2))
}
function generateId() {
  return v4()
}
function getIdentity() {
  var key = 'identity'
  var identity = sessionStorage.getItem(key)
  if (!identity) {
    // 生成标识
    identity = generateId()
    sessionStorage.setItem(key, identity)
  }
  return identity
}
function getReferer() {
  if (typeof document === 'undefined' || document.location == null) return ''
  return document.location.href
}

var isPerformance = function () {
  return (
    !!window.performance &&
    !!window.performance.getEntriesByType &&
    !!window.performance.mark
  )
}
var isPerformanceObserver = function () {
  return !!window.PerformanceObserver
}
var isNavigator = function () {
  return !!window.navigator
}
// dom 对象是否在屏幕内
var isInScreen = function (dom) {
  var viewportWidth = window.innerWidth
  var viewportHeight = window.innerHeight
  var rectInfo = dom.getBoundingClientRect()
  if (
    rectInfo.left >= 0 &&
    rectInfo.left < viewportWidth &&
    rectInfo.top >= 0 &&
    rectInfo.top < viewportHeight
  ) {
    return true
  }
}
var isIncludeEle = function (node, arr) {
  if (!node || node === document.documentElement) {
    return false
  }
  if (arr.includes(node)) {
    return true
  }
  return isIncludeEle(node.parentElement, arr)
}

// 页面加载完成
var onLoaded = function (callback) {
  if (document.readyState === 'complete') {
    setTimeout(callback)
  } else {
    addEventListener('pageshow', callback)
  }
}
// 页面隐藏
function onHidden(callback, once) {
  var onHiddenOrPageHide = function (event) {
    if (event.type === 'pagehide' || document.visibilityState === 'hidden') {
      callback(event)
      if (once) {
        window.removeEventListener('visibilitychange', onHiddenOrPageHide, true)
        window.removeEventListener('pagehide', onHiddenOrPageHide, true)
      }
    }
  }
  window.addEventListener('visibilitychange', onHiddenOrPageHide, true)
  window.addEventListener('pagehide', onHiddenOrPageHide, true)
}
// 页面卸载（关闭）或刷新时调用
var beforeUnload = function (callback) {
  window.addEventListener('beforeunload', callback)
}

var Queue = /** @class */ (function () {
  function Queue() {
    this.pending = false
    this.callbacks = []
  }
  Queue.prototype.push = function (fn) {
    var _this = this
    if (typeof fn !== 'function') return
    this.callbacks.push(fn)
    if (!this.pending) {
      this.pending = true
      Promise.resolve().then(function () {
        _this.flushCallbacks()
      })
    }
  }
  Queue.prototype.flushCallbacks = function () {
    this.pending = false
    var copies = this.callbacks.slice()
    this.callbacks.length = 0
    for (var i = 0; i < copies.length; i++) {
      copies[i]()
    }
  }
  Queue.prototype.getCallbacks = function () {
    return this.callbacks
  }
  Queue.prototype.clear = function () {
    this.callbacks = []
  }
  return Queue
})()

var ReportInfo = /** @class */ (function () {
  function ReportInfo(options) {
    this.options = options
    this.sendWay = options.sendWay
    this.queue = new Queue()
  }
  ReportInfo.prototype.beforeSend = function (data) {
    var commonInfo = {
      project: this.options.project,
      version: this.options.version,
      projectSub: this.options.proSub,
      referer: getReferer(),
      identity: getIdentity(),
    }
    return Object.assign(data, commonInfo)
  }
  ReportInfo.prototype.send = function (data, isImmediate) {
    var sendData = this.beforeSend(data)
    var fn =
      this.sendWay == 'sendBeacon'
        ? this.useBeacon(sendData)
        : this.sendWay == 'img'
        ? this.useImg(sendData)
        : this.useAjax(sendData)
    isImmediate ? fn() : this.queue.push(fn)
  }
  ReportInfo.prototype.useImg = function (data) {
    var _this = this
    var fn = function () {
      var img = new Image()
      var spliceStr = _this.options.url.indexOf('?') === -1 ? '?' : '&'
      img.src = ''
        .concat(_this.options.url)
        .concat(spliceStr)
        .concat(formatParams(data))
      img = null
    }
    return fn
  }
  ReportInfo.prototype.useAjax = function (data) {
    var _this = this
    var fn = function () {
      var xhr = new XMLHttpRequest()
      xhr.open('POST', _this.options.url)
      xhr.withCredentials
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.send(JSON.stringify(data))
      xhr.onreadystatechange = function () {
        console.log(xhr.readyState, xhr.status)
      }
    }
    return fn
  }
  ReportInfo.prototype.useBeacon = function (data) {
    var _this = this
    if (navigator.sendBeacon) {
      var fn = function () {
        navigator.sendBeacon(_this.options.url, JSON.stringify(data))
      }
      return fn
    } else {
      return this.useAjax(data)
    }
  }
  return ReportInfo
})()

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __values(o) {
  var s = typeof Symbol === 'function' && Symbol.iterator,
    m = s && o[s],
    i = 0
  if (m) return m.call(o)
  if (o && typeof o.length === 'number')
    return {
      next: function () {
        if (o && i >= o.length) o = void 0
        return { value: o && o[i++], done: !o }
      },
    }
  throw new TypeError(
    s ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
  )
}

function __read(o, n) {
  var m = typeof Symbol === 'function' && o[Symbol.iterator]
  if (!m) return o
  var i = m.call(o),
    r,
    ar = [],
    e
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value)
  } catch (error) {
    e = { error: error }
  } finally {
    try {
      if (r && !r.done && (m = i['return'])) m.call(i)
    } finally {
      if (e) throw e.error
    }
  }
  return ar
}

var Store = /** @class */ (function () {
  function Store() {
    this.store = new Map()
  }
  Store.prototype.get = function (key) {
    return this.store.get(key)
  }
  Store.prototype.set = function (key, val) {
    this.store.set(key, val)
  }
  Store.prototype.clear = function () {
    this.store.clear()
  }
  Store.prototype.getValues = function () {
    return Array.from(this.store).reduce(function (obj, _a) {
      var _b = __read(_a, 2),
        key = _b[0],
        value = _b[1]
      obj[key] = value
      return obj
    }, {})
  }
  return Store
})()

function observe(type, handler) {
  if (PerformanceObserver.supportedEntryTypes.includes(type)) {
    var ob = new PerformanceObserver(function (item) {
      return item.getEntries().map(handler)
    })
    ob.observe({ type: type, buffered: true })
    return ob
  }
}

var Error$1 = /** @class */ (function () {
  function Error(options) {
    this.init(options)
    this.reportInfo = new ReportInfo(options)
  }
  Error.prototype.init = function (options) {
    this.handleJS()
    this.handleAajxError()
    if (options.isVue) {
      this.handleVue(options.vue)
    }
  }
  Error.prototype.report = function (secondType, value) {
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
  Error.prototype.handleJS = function () {
    var _this = this
    window.addEventListener(
      'error',
      function (event) {
        var target = event.target
        if (target && (target.src || target.href)) {
          _this.report(ErrorType.RESOURCE, {
            message: '资源加载异常了',
            filename: target.src || target.href,
            tagName: target.tagName,
          })
        } else {
          var message = event.message,
            filename = event.filename,
            lineno = event.lineno,
            colno = event.colno
          _this.report(ErrorType.JS, {
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
      function (event) {
        var message
        var filename
        var line = 0
        var column = 0
        var stack = ''
        var reason = event.reason
        if (typeof reason === 'string') {
          message = reason
        } else if (typeof reason === 'object') {
          message = reason.message
          if (reason.stack) {
            var matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/)
            filename = matchResult[1]
            line = matchResult[2]
            column = matchResult[3]
          }
          stack = getLines(reason.stack)
        }
        _this.report(ErrorType.PROMISE, {
          message: message,
          filename: filename,
          row: line,
          col: column,
          stack: stack,
        })
      },
      true
    )
  }
  // vue错误监控;
  Error.prototype.handleVue = function (Vue) {
    var _this = this
    Vue.config.errorHandler = function (error, vm, info) {
      var componentName
      if (Object.prototype.toString.call(vm) === '[object Object]') {
        componentName = vm._isVue
          ? vm.$options.name || vm.$options._componentTag
          : vm.name
      }
      var value = {
        message: error.message,
        info: info,
        componentName: componentName,
        stack: error.stack,
      }
      // 匹配到代码报错出现位置
      var reg = /.js\:(\d+)\:(\d+)/i
      var codePos = error.stack.match(reg)
      if (codePos.length) {
        value.row = parseInt(codePos[1])
        value.col = parseInt(codePos[2])
      }
      _this.report(ErrorType.VUE, value)
    }
  }
  //ajax请求错误
  Error.prototype.handleAajxError = function () {
    var _this = this
    if (!window.XMLHttpRequest) {
      return
    }
    var xhrSend = XMLHttpRequest.prototype.send
    XMLHttpRequest.prototype.send = function () {
      var args = []
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i]
      }
      if (this.addEventListener) {
        this.addEventListener('error', _handleEvent)
        this.addEventListener('load', _handleEvent)
        this.addEventListener('abort', _handleEvent)
      } else {
        var tempStateChange_1 = this.onreadystatechange
        this.onreadystatechange = function (event) {
          tempStateChange_1.apply(this, args)
          if (this.readyState === 4) {
            _handleEvent(event)
          }
        }
      }
      return xhrSend.apply(this, args)
    }
    var _handleEvent = function (event) {
      try {
        if (!event) return
        var target = event.currentTarget
        if (target && target.status !== 200) {
          _this.report(ErrorType.AJAX, {
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
  return Error
})()

// first-paint  从页面加载开始到第一个像素绘制到屏幕上的时间
//  first-contentful-paint 从页面加载开始到页面内容的任何部分在屏幕上完成渲染的时间
function getEntriesByFP(setStore) {
  var entryFP = performance.getEntriesByName('first-paint')[0]
  var entryFCP = performance.getEntriesByName('first-contentful-paint')[0]
  setStore(PerformanceType.FP, entryFP.startTime.toFixed(2))
  setStore(PerformanceType.FCP, entryFCP.startTime.toFixed(2))
}
function getFP(setStore) {
  if (!isPerformanceObserver()) {
    if (!isPerformance()) {
      throw new Error('浏览器不支持performance')
    } else {
      onLoaded(function () {
        getEntriesByFP(setStore)
      })
    }
  } else {
    var entryHandler = function (entry) {
      if (ob_1) {
        ob_1.disconnect()
      }
      setStore(PerformanceType.FP, entry.startTime.toFixed(2))
    }
    var ob_1 = observe('paint', entryHandler)
  }
}

// largest-contentful-paint 从页面加载开始到最大文本块或图像元素在屏幕上完成渲染的时间
var lcpDone = false
function isLCPDone() {
  return lcpDone
}
function getLCP(setStore) {
  if (!isPerformanceObserver()) {
    lcpDone = true
    throw new Error('浏览器不支持PerformanceObserver')
  } else {
    var entryHandler = function (entry) {
      lcpDone = true
      if (ob_1) {
        ob_1.disconnect()
      }
      setStore(PerformanceType.LCP, entry.startTime.toFixed(2))
    }
    var ob_1 = observe('largest-contentful-paint', entryHandler)
  }
}

// layout-shift 从页面加载开始和其生命周期状态变为隐藏期间发生的所有意外布局偏移的累积分数
var value = 0
function getCLS(setStore) {
  if (!isPerformanceObserver()) {
    throw new Error('浏览器不支持PerformanceObserver')
  } else {
    var entryHandler = function (entry) {
      if (!entry.hadRecentInput) {
        value += entry.value
      }
    }
    var ob_1 = observe(PerformanceType.CLS, entryHandler)
    var stopListening = function () {
      if (ob_1 === null || ob_1 === void 0 ? void 0 : ob_1.takeRecords) {
        ob_1.takeRecords().map(function (entry) {
          if (!entry.hadRecentInput) {
            value += entry.value
          }
        })
      }
      ob_1 === null || ob_1 === void 0 ? void 0 : ob_1.disconnect()
      setStore(PerformanceType.CLS, value.toFixed(2))
    }
    onHidden(stopListening, true)
  }
}

// first-input 测量用户首次与您的站点交互时的时间（即，当他们单击链接，点击按钮或使用自定义的JavaScript驱动控件时）到浏览器实际能够的时间回应这种互动。
function getFID(setStore) {
  if (!isPerformanceObserver()) {
    throw new Error('浏览器不支持PerformanceObserver')
  } else {
    var entryHandler = function (entry) {
      if (ob_1) {
        ob_1.disconnect()
      }
      setStore(PerformanceType.FID, {
        value: entry.startTime.toFixed(2),
        event: entry.name,
      })
    }
    var ob_1 = observe(PerformanceType.FID, entryHandler)
  }
}

//first-screen-paint 首屏渲染时间
var entries = []
var isOnLoaded = false
onLoaded(function () {
  isOnLoaded = true
})
var timer
function checkDOMChange(setStore) {
  clearTimeout(timer)
  timer = setTimeout(function () {
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
  var startTime = 0
  entries.forEach(function (entry) {
    var e_1, _a
    try {
      for (
        var _b = __values(entry.children), _c = _b.next();
        !_c.done;
        _c = _b.next()
      ) {
        var node = _c.value
        if (
          isInScreen(node) &&
          entry.startTime > startTime &&
          needToCalculate(node)
        ) {
          startTime = entry.startTime
          break
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 }
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b)
      } finally {
        if (e_1) throw e_1.error
      }
    }
  })
  // 需要和当前页面所有加载图片的时间做对比，取最大值
  // 图片请求时间要小于 startTime，响应结束时间要大于 startTime
  performance.getEntriesByType('resource').forEach(function (item) {
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
function getFSP(setStore) {
  if (!MutationObserver) {
    throw new Error('浏览器不支持MutationObserver')
  }
  var next = window.requestAnimationFrame ? requestAnimationFrame : setTimeout
  var ignoreDOMList = ['STYLE', 'SCRIPT', 'LINK', 'META']
  var ob = new MutationObserver(function (mutationList) {
    var e_2, _a, e_3, _b
    checkDOMChange(setStore)
    next(function () {
      entry.startTime = performance.now()
    })
    var entry = {
      startTime: 0,
      children: [],
    }
    try {
      for (
        var mutationList_1 = __values(mutationList),
          mutationList_1_1 = mutationList_1.next();
        !mutationList_1_1.done;
        mutationList_1_1 = mutationList_1.next()
      ) {
        var mutation = mutationList_1_1.value
        if (mutation.addedNodes.length) {
          var nodeLists = Array.from(mutation.addedNodes)
          try {
            for (
              var nodeLists_1 = ((e_3 = void 0), __values(nodeLists)),
                nodeLists_1_1 = nodeLists_1.next();
              !nodeLists_1_1.done;
              nodeLists_1_1 = nodeLists_1.next()
            ) {
              var node = nodeLists_1_1.value
              if (
                node.nodeType === 1 &&
                !ignoreDOMList.includes(
                  node === null || node === void 0 ? void 0 : node.tagName
                ) &&
                !isIncludeEle(node, entry.children)
              ) {
                entry.children.push(node)
              }
            }
          } catch (e_3_1) {
            e_3 = { error: e_3_1 }
          } finally {
            try {
              if (
                nodeLists_1_1 &&
                !nodeLists_1_1.done &&
                (_b = nodeLists_1.return)
              )
                _b.call(nodeLists_1)
            } finally {
              if (e_3) throw e_3.error
            }
          }
        }
      }
    } catch (e_2_1) {
      e_2 = { error: e_2_1 }
    } finally {
      try {
        if (
          mutationList_1_1 &&
          !mutationList_1_1.done &&
          (_a = mutationList_1.return)
        )
          _a.call(mutationList_1)
      } finally {
        if (e_2) throw e_2.error
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

// navigation 可以获取到用户访问一个页面的每个阶段的精确时间
function setPerformanceData(setStore, entry) {
  var domainLookupStart = entry.domainLookupStart,
    domainLookupEnd = entry.domainLookupEnd,
    connectStart = entry.connectStart,
    connectEnd = entry.connectEnd,
    secureConnectionStart = entry.secureConnectionStart,
    requestStart = entry.requestStart,
    responseStart = entry.responseStart,
    responseEnd = entry.responseEnd,
    domInteractive = entry.domInteractive,
    domContentLoadedEventStart = entry.domContentLoadedEventStart,
    domContentLoadedEventEnd = entry.domContentLoadedEventEnd,
    loadEventStart = entry.loadEventStart,
    fetchStart = entry.fetchStart
  var timing = {
    // DNS解析时间
    dnsLookup: (domainLookupEnd - domainLookupStart).toFixed(2),
    // TCP完成握手时间
    initialConnection: (connectEnd - connectStart).toFixed(2),
    // ssl连接时间
    ssl: secureConnectionStart
      ? (connectEnd - secureConnectionStart).toFixed(2)
      : 0,
    // HTTP请求响应完成时间
    ttfb: (responseStart - requestStart).toFixed(2),
    // 读取页面第一个字节的时间
    contentDownload: (responseEnd - responseStart).toFixed(2),
    // dom解析时间
    domParse: (domInteractive - responseEnd).toFixed(2),
    // DOM 准备就绪时间
    deferExecuteDuration: (domContentLoadedEventStart - domInteractive).toFixed(
      2
    ),
    // 脚本加载时间
    domContentLoadedCallback: (
      domContentLoadedEventEnd - domContentLoadedEventStart
    ).toFixed(2),
    // onload事件时间
    resourceLoad: (loadEventStart - domContentLoadedEventEnd).toFixed(2),
    // DOM阶段渲染耗时
    domReady: (domContentLoadedEventEnd - fetchStart).toFixed(2),
  }
  setStore(PerformanceType.NAV, timing)
}
function getPerformanceentryTim() {
  var entryTim =
    performance.getEntriesByType('navigation').length > 0
      ? performance.getEntriesByType('navigation')[0]
      : performance.timing
  return entryTim
}
function getNavTiming(setStore) {
  if (!isPerformanceObserver()) {
    if (!isPerformance()) {
      throw new Error('浏览器不支持performance')
    } else {
      onLoaded(function () {
        setPerformanceData(setStore, getPerformanceentryTim())
      })
    }
  } else {
    var entryHandler = function (entry) {
      if (ob_1) {
        ob_1.disconnect()
      }
      setPerformanceData(setStore, entry)
    }
    var ob_1 = observe(PerformanceType.NAV, entryHandler)
  }
}

// 获取内存占用空间
function getMemory(setStore) {
  if (!isPerformance()) {
    throw new Error('浏览器不支持Performance')
  }
  if (!isNavigator()) {
    throw new Error('浏览器不支持Navigator')
  }
  var value = {
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

// 获取网络环境信息
function getNavConnection(setStore) {
  if (!isNavigator()) {
    throw new Error('浏览器不支持Navigator')
  } else {
    var connection = 'connection' in navigator ? navigator['connection'] : {}
    var value = {
      downlink: connection.downlink,
      effectiveType: connection.effectiveType,
      rtt: connection.rtt,
    }
    setStore(PerformanceType.NC, value)
  }
}

function getDevices(setStore) {
  if (!window.location) {
    throw new Error('浏览器不支持location')
  }
  var host = location.host,
    hostname = location.hostname,
    href = location.href,
    protocol = location.protocol,
    origin = location.origin,
    port = location.port,
    pathname = location.pathname,
    search = location.search,
    hash = location.hash
  var _a = window.screen,
    width = _a.width,
    height = _a.height
  var info = {
    host: host,
    hostname: hostname,
    href: href,
    protocol: protocol,
    origin: origin,
    port: port,
    pathname: pathname,
    search: search,
    hash: hash,
    userAgent: 'userAgent' in navigator ? navigator.userAgent : '',
    screenResolution: ''.concat(width, '*').concat(height),
  }
  setStore(PerformanceType.DICE, info)
}

var Performance = /** @class */ (function () {
  function Performance(options) {
    this.newStore = new Store()
    this.reportInfo = new ReportInfo(options)
    this.init()
  }
  Performance.prototype.init = function () {
    getFP(this.setStore.bind(this))
    getLCP(this.setStore.bind(this))
    getCLS(this.setStore.bind(this))
    getFID(this.setStore.bind(this))
    getNavConnection(this.setStore.bind(this))
    getNavTiming(this.setStore.bind(this))
    getFSP(this.setStore.bind(this))
    getMemory(this.setStore.bind(this))
    getDevices(this.setStore.bind(this))
    this.report()
  }
  Performance.prototype.report = function () {
    var _this = this
    ;[onLoaded, onHidden, beforeUnload].forEach(function (event) {
      event(function () {
        var storeData = _this.newStore.getValues()
        Object.keys(storeData).forEach(function (key) {
          _this.reportInfo.send(storeData[key])
        })
        _this.newStore.clear()
      })
    })
  }
  Performance.prototype.setStore = function (secondType, value) {
    var data = {
      type: MonitorType.PERFORMANCE,
      secondType: secondType,
      level: Level.INFO,
      time: getNowTime(),
      value: value,
    }
    this.newStore.set(secondType, data)
  }
  return Performance
})()

var Monitor = /** @class */ (function () {
  function Monitor(options) {
    this.init(options)
  }
  Monitor.prototype.init = function (options) {
    if (!this.isSetCondition(options)) return
    this.setDefault(options)
    if (options.isCollectPer) {
      new Performance(options)
    }
    if (options.isCollectErr) {
      new Error$1(options)
    }
  }
  Monitor.prototype.isSetCondition = function (options) {
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
  Monitor.prototype.setDefault = function (options) {
    Object.keys(defaultOptions).forEach(function (key) {
      if (options[key] == null) {
        options[key] = defaultOptions[key]
      }
    })
  }
  return Monitor
})()

export { Monitor as default }
