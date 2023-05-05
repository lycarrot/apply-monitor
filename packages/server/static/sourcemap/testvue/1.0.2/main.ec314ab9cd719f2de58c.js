!(function (t) {
  var e = {}
  function n(r) {
    if (e[r]) return e[r].exports
    var o = (e[r] = { i: r, l: !1, exports: {} })
    return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports
  }
  ;(n.m = t),
    (n.c = e),
    (n.d = function (t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r })
    }),
    (n.r = function (t) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 })
    }),
    (n.t = function (t, e) {
      if ((1 & e && (t = n(t)), 8 & e)) return t
      if (4 & e && 'object' == typeof t && t && t.__esModule) return t
      var r = Object.create(null)
      if (
        (n.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: t }),
        2 & e && 'string' != typeof t)
      )
        for (var o in t)
          n.d(
            r,
            o,
            function (e) {
              return t[e]
            }.bind(null, o)
          )
      return r
    }),
    (n.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default
            }
          : function () {
              return t
            }
      return n.d(e, 'a', e), e
    }),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e)
    }),
    (n.p = ''),
    n((n.s = 4))
})([
  function (t, e) {
    t.exports = Vue
  },
  function (t, e, n) {},
  function (t, e, n) {
    t.exports = (function () {
      'use strict'
      var t,
        e,
        n,
        r,
        o,
        i = {
          url: '//127.0.0.1:8000/api/collect/info/detail',
          sendWay: 'sendBeacon',
          isCollectErr: !0,
          isCollectPer: !0,
          isCollectBehavior: !0,
        }
      let a
      ;(function (t) {
        ;(t.ERROR = 'error'),
          (t.PERFORMANCE = 'performance'),
          (t.BEHAVIOR = 'behavior')
      })(t || (t = {})),
        (function (t) {
          ;(t.ERROR = 'error'), (t.WARN = 'warn'), (t.INFO = 'info')
        })(e || (e = {})),
        (function (t) {
          ;(t.JS = 'js_error'),
            (t.RESOURCE = 'resource_error'),
            (t.VUE = 'vue_error'),
            (t.PROMISE = 'promise_error'),
            (t.AJAX = 'ajax_error')
        })(n || (n = {})),
        (function (t) {
          ;(t.FP = 'first-paint'),
            (t.FCP = 'first-contentful-paint'),
            (t.LCP = 'largest-contentful-paint'),
            (t.CLS = 'layout-shift'),
            (t.FID = 'first-input'),
            (t.FSP = 'first-screen-paint'),
            (t.NC = 'nav-connecttion'),
            (t.NAV = 'navigation'),
            (t.MRY = 'memory'),
            (t.DICE = 'devices')
        })(r || (r = {})),
        (function (t) {
          ;(t.PV = 'pv'), (t.VJ = 'vue-jump'), (t.PD = 'page-duration')
        })(o || (o = {}))
      const s = new Uint8Array(16)
      function c() {
        if (
          !a &&
          ((a =
            'undefined' != typeof crypto &&
            crypto.getRandomValues &&
            crypto.getRandomValues.bind(crypto)),
          !a)
        )
          throw new Error(
            'crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported'
          )
        return a(s)
      }
      const u = []
      for (let t = 0; t < 256; ++t) u.push((t + 256).toString(16).slice(1))
      var f = {
        randomUUID:
          'undefined' != typeof crypto &&
          crypto.randomUUID &&
          crypto.randomUUID.bind(crypto),
      }
      function p(t, e, n) {
        if (f.randomUUID && !e && !t) return f.randomUUID()
        const r = (t = t || {}).random || (t.rng || c)()
        if (((r[6] = (15 & r[6]) | 64), (r[8] = (63 & r[8]) | 128), e)) {
          n = n || 0
          for (let t = 0; t < 16; ++t) e[n + t] = r[t]
          return e
        }
        return (function (t, e = 0) {
          return (
            u[t[e + 0]] +
            u[t[e + 1]] +
            u[t[e + 2]] +
            u[t[e + 3]] +
            '-' +
            u[t[e + 4]] +
            u[t[e + 5]] +
            '-' +
            u[t[e + 6]] +
            u[t[e + 7]] +
            '-' +
            u[t[e + 8]] +
            u[t[e + 9]] +
            '-' +
            u[t[e + 10]] +
            u[t[e + 11]] +
            u[t[e + 12]] +
            u[t[e + 13]] +
            u[t[e + 14]] +
            u[t[e + 15]]
          ).toLowerCase()
        })(r)
      }
      function l(t) {
        return t
          .split('\n')
          .slice(1)
          .map(function (t) {
            return t.replace(/^\s+at\s+/g, '')
          })
          .join('^')
      }
      function h() {
        return Date.now()
      }
      function d(t) {
        return 'number' != typeof t
          ? null
          : parseFloat((t / Math.pow(1024, 2)).toFixed(2))
      }
      function v() {
        var t = sessionStorage.getItem('identity')
        return t || ((t = p()), sessionStorage.setItem('identity', t)), t
      }
      var y = function () {
          return (
            !!window.performance &&
            !!window.performance.getEntriesByType &&
            !!window.performance.mark
          )
        },
        m = function () {
          return !!window.PerformanceObserver
        },
        g = function () {
          return !!window.navigator
        },
        w = function (t) {
          var e = window.innerWidth,
            n = window.innerHeight,
            r = t.getBoundingClientRect()
          if (r.left >= 0 && r.left < e && r.top >= 0 && r.top < n) return !0
        },
        b = function (t, e) {
          return (
            !(!t || t === document.documentElement) &&
            (!!e.includes(t) || b(t.parentElement, e))
          )
        },
        E = function (t) {
          'complete' === document.readyState
            ? setTimeout(t)
            : addEventListener('pageshow', t)
        }
      function S(t, e) {
        var n = function (r) {
          ;('pagehide' !== r.type && 'hidden' !== document.visibilityState) ||
            (t(r),
            e &&
              (window.removeEventListener('visibilitychange', n, !0),
              window.removeEventListener('pagehide', n, !0)))
        }
        window.addEventListener('visibilitychange', n, !0),
          window.addEventListener('pagehide', n, !0)
      }
      var x = function (t) {
          window.addEventListener('beforeunload', t)
        },
        R = (function () {
          function t() {
            ;(this.pending = !1), (this.callbacks = [])
          }
          return (
            (t.prototype.push = function (t) {
              var e = this
              'function' == typeof t &&
                (this.callbacks.push(t),
                this.pending ||
                  ((this.pending = !0),
                  Promise.resolve().then(function () {
                    e.flushCallbacks()
                  })))
            }),
            (t.prototype.flushCallbacks = function () {
              this.pending = !1
              var t = this.callbacks.slice()
              this.callbacks.length = 0
              for (var e = 0; e < t.length; e++) t[e]()
            }),
            (t.prototype.getCallbacks = function () {
              return this.callbacks
            }),
            (t.prototype.clear = function () {
              this.callbacks = []
            }),
            t
          )
        })(),
        C = (function () {
          function t(t) {
            ;(this.options = t),
              (this.sendWay = t.sendWay),
              (this.queue = new R())
          }
          return (
            (t.prototype.beforeSend = function (t) {
              var e = {
                project: this.options.project,
                version: this.options.version,
                projectSub: this.options.proSub,
                referer:
                  'undefined' == typeof document || null == document.location
                    ? ''
                    : document.location.href,
                identity: v(),
              }
              return Object.assign(t, e)
            }),
            (t.prototype.send = function (t, e) {
              var n = this.beforeSend(t),
                r =
                  'sendBeacon' == this.sendWay
                    ? this.useBeacon(n)
                    : 'img' == this.sendWay
                    ? this.useImg(n)
                    : this.useAjax(n)
              e ? r() : this.queue.push(r)
            }),
            (t.prototype.useImg = function (t) {
              var e = this
              return function () {
                var n,
                  r,
                  o = new Image(),
                  i = -1 === e.options.url.indexOf('?') ? '?' : '&'
                ;(o.src = ''
                  .concat(e.options.url)
                  .concat(i)
                  .concat(
                    ((n = t),
                    (r = []),
                    Object.keys(n).forEach(function (t) {
                      r.push(
                        ''
                          .concat(encodeURIComponent(t), '=')
                          .concat(encodeURIComponent(n[t]))
                      )
                    }),
                    r.join('&'))
                  )),
                  (o = null)
              }
            }),
            (t.prototype.useAjax = function (t) {
              var e = this
              return function () {
                var n = new XMLHttpRequest()
                n.open('POST', e.options.url),
                  n.withCredentials,
                  n.setRequestHeader('Content-Type', 'application/json'),
                  n.send(JSON.stringify(t)),
                  (n.onreadystatechange = function () {
                    console.log(n.readyState, n.status)
                  })
              }
            }),
            (t.prototype.useBeacon = function (t) {
              var e = this
              return navigator.sendBeacon
                ? function () {
                    navigator.sendBeacon(e.options.url, JSON.stringify(t))
                  }
                : this.useAjax(t)
            }),
            t
          )
        })()
      function k(t) {
        var e = 'function' == typeof Symbol && Symbol.iterator,
          n = e && t[e],
          r = 0
        if (n) return n.call(t)
        if (t && 'number' == typeof t.length)
          return {
            next: function () {
              return (
                t && r >= t.length && (t = void 0),
                { value: t && t[r++], done: !t }
              )
            },
          }
        throw new TypeError(
          e ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
        )
      }
      var _ = (function () {
        function t() {
          this.store = new Map()
        }
        return (
          (t.prototype.get = function (t) {
            return this.store.get(t)
          }),
          (t.prototype.set = function (t, e) {
            this.store.set(t, e)
          }),
          (t.prototype.clear = function () {
            this.store.clear()
          }),
          (t.prototype.getValues = function () {
            return Array.from(this.store).reduce(function (t, e) {
              var n = (function (t, e) {
                  var n = 'function' == typeof Symbol && t[Symbol.iterator]
                  if (!n) return t
                  var r,
                    o,
                    i = n.call(t),
                    a = []
                  try {
                    for (; (void 0 === e || e-- > 0) && !(r = i.next()).done; )
                      a.push(r.value)
                  } catch (t) {
                    o = { error: t }
                  } finally {
                    try {
                      r && !r.done && (n = i.return) && n.call(i)
                    } finally {
                      if (o) throw o.error
                    }
                  }
                  return a
                })(e, 2),
                r = n[0],
                o = n[1]
              return (t[r] = o), t
            }, {})
          }),
          t
        )
      })()
      function O(t, e) {
        if (PerformanceObserver.supportedEntryTypes.includes(t)) {
          var n = new PerformanceObserver(function (t) {
            return t.getEntries().map(e)
          })
          return n.observe({ type: t, buffered: !0 }), n
        }
      }
      var j = (function () {
        function r(t) {
          this.init(t), (this.reportInfo = new C(t))
        }
        return (
          (r.prototype.init = function (t) {
            this.handleJS(),
              this.handleAajxError(),
              t.isVue && this.handleVue(t.vue)
          }),
          (r.prototype.report = function (n, r) {
            console.log('value', r),
              this.reportInfo.send(
                {
                  type: t.ERROR,
                  secondType: n,
                  level: e.ERROR,
                  time: h(),
                  value: r,
                },
                !0
              )
          }),
          (r.prototype.handleJS = function () {
            var t = this
            window.addEventListener(
              'error',
              function (e) {
                var r = e.target
                if (r && (r.src || r.href))
                  t.report(n.RESOURCE, {
                    message: '资源加载异常了',
                    filename: r.src || r.href,
                    tagName: r.tagName,
                  })
                else {
                  var o = e.message,
                    i = e.filename,
                    a = e.lineno,
                    s = e.colno
                  t.report(n.JS, {
                    message: o,
                    filename: i,
                    row: a,
                    col: s,
                    stack: e.error && l(e.error.stack),
                  })
                }
              },
              !0
            ),
              window.addEventListener(
                'unhandledrejection',
                function (e) {
                  var r,
                    o,
                    i = 0,
                    a = 0,
                    s = '',
                    c = e.reason
                  if ('string' == typeof c) r = c
                  else if ('object' == typeof c) {
                    if (((r = c.message), c.stack)) {
                      var u = c.stack.match(/at\s+(.+):(\d+):(\d+)/)
                      ;(o = u[1]), (i = u[2]), (a = u[3])
                    }
                    s = l(c.stack)
                  }
                  t.report(n.PROMISE, {
                    message: r,
                    filename: o,
                    row: i,
                    col: a,
                    stack: s,
                  })
                },
                !0
              )
          }),
          (r.prototype.handleVue = function (t) {
            var e = this
            t.config.errorHandler = function (t, r, o) {
              var i
              '[object Object]' === Object.prototype.toString.call(r) &&
                (i = r._isVue
                  ? r.$options.name || r.$options._componentTag
                  : r.name)
              var a = {
                  message: t.message,
                  info: o,
                  componentName: i,
                  stack: t.stack,
                },
                s = t.stack.match(/.js\:(\d+)\:(\d+)/i)
              s.length && ((a.row = parseInt(s[1])), (a.col = parseInt(s[2]))),
                e.report(n.VUE, a)
            }
          }),
          (r.prototype.handleAajxError = function () {
            var t = this
            if (window.XMLHttpRequest) {
              var e = XMLHttpRequest.prototype.send
              XMLHttpRequest.prototype.send = function () {
                if (this.addEventListener)
                  this.addEventListener('error', r),
                    this.addEventListener('load', r),
                    this.addEventListener('abort', r)
                else {
                  var t = this.onreadystatechange
                  this.onreadystatechange = function (e) {
                    t.apply(this, arguments), 4 === this.readyState && r(e)
                  }
                }
                return e.apply(this, arguments)
              }
              var r = function (e) {
                try {
                  if (!e) return
                  var r = e.currentTarget
                  r &&
                    200 !== r.status &&
                    t.report(n.AJAX, {
                      message: r.response,
                      status: r.status,
                      statusText: r.statusText,
                      url: r.responseURL,
                    })
                } catch (t) {
                  console.log(t)
                }
              }
            }
          }),
          r
        )
      })()
      function A(t) {
        if (m())
          var e = O('paint', function (n) {
            e && e.disconnect(), t(r.FP, n.startTime.toFixed(2))
          })
        else {
          if (!y()) throw new Error('浏览器不支持performance')
          E(function () {
            !(function (t) {
              var e = performance.getEntriesByName('first-paint')[0],
                n = performance.getEntriesByName('first-contentful-paint')[0]
              t(r.FP, e.startTime.toFixed(2)), t(r.FCP, n.startTime.toFixed(2))
            })(t)
          })
        }
      }
      var T,
        L = !1,
        P = 0,
        I = [],
        F = !1
      function $(t) {
        clearTimeout(T),
          (T = setTimeout(function () {
            var e
            F && L
              ? (t(
                  r.FSP,
                  ((e = 0),
                  I.forEach(function (t) {
                    var n, r
                    try {
                      for (
                        var o = k(t.children), i = o.next();
                        !i.done;
                        i = o.next()
                      ) {
                        var a = i.value
                        if (w(a) && t.startTime > e && U(a)) {
                          e = t.startTime
                          break
                        }
                      }
                    } catch (t) {
                      n = { error: t }
                    } finally {
                      try {
                        i && !i.done && (r = o.return) && r.call(o)
                      } finally {
                        if (n) throw n.error
                      }
                    }
                  }),
                  performance
                    .getEntriesByType('resource')
                    .forEach(function (t) {
                      'img' === t.initiatorType &&
                        t.fetchStart < e &&
                        t.responseEnd > e &&
                        (e = t.responseEnd)
                    }),
                  e)
                ),
                (I = null))
              : $(t)
          }, 500))
      }
      function U(t) {
        return (
          'none' !== window.getComputedStyle(t).display &&
          !('IMG' === t.tagName && t.width < 2 && t.height < 2)
        )
      }
      function M(t, e) {
        var n = e.domainLookupStart,
          o = e.domainLookupEnd,
          i = e.connectStart,
          a = e.connectEnd,
          s = e.secureConnectionStart,
          c = e.requestStart,
          u = e.responseStart,
          f = e.responseEnd,
          p = e.domInteractive,
          l = e.domContentLoadedEventStart,
          h = e.domContentLoadedEventEnd,
          d = e.loadEventStart,
          v = e.fetchStart,
          y = {
            dnsLookup: (o - n).toFixed(2),
            initialConnection: (a - i).toFixed(2),
            ssl: s ? (a - s).toFixed(2) : 0,
            ttfb: (u - c).toFixed(2),
            contentDownload: (f - u).toFixed(2),
            domParse: (p - f).toFixed(2),
            deferExecuteDuration: (l - p).toFixed(2),
            domContentLoadedCallback: (h - l).toFixed(2),
            resourceLoad: (d - h).toFixed(2),
            domReady: (h - v).toFixed(2),
          }
        t(r.NAV, y)
      }
      function V(t) {
        if (m())
          var e = O(r.NAV, function (n) {
            e && e.disconnect(), M(t, n)
          })
        else {
          if (!y()) throw new Error('浏览器不支持performance')
          E(function () {
            M(
              t,
              performance.getEntriesByType('navigation').length > 0
                ? performance.getEntriesByType('navigation')[0]
                : performance.timing
            )
          })
        }
      }
      E(function () {
        F = !0
      })
      var N = (function () {
        function n(t) {
          ;(this.newStore = new _()), (this.reportInfo = new C(t)), this.init()
        }
        return (
          (n.prototype.init = function () {
            A(this.setStore.bind(this)),
              (function (t) {
                if (!m())
                  throw ((L = !0), new Error('浏览器不支持PerformanceObserver'))
                var e = O('largest-contentful-paint', function (n) {
                  ;(L = !0),
                    e && e.disconnect(),
                    t(r.LCP, n.startTime.toFixed(2))
                })
              })(this.setStore.bind(this)),
              (function (t) {
                if (!m()) throw new Error('浏览器不支持PerformanceObserver')
                var e = O(r.CLS, function (t) {
                  t.hadRecentInput || (P += t.value)
                })
                S(function () {
                  ;(null == e ? void 0 : e.takeRecords) &&
                    e.takeRecords().map(function (t) {
                      t.hadRecentInput || (P += t.value)
                    }),
                    null == e || e.disconnect(),
                    t(r.CLS, P.toFixed(2))
                }, !0)
              })(this.setStore.bind(this)),
              (function (t) {
                if (!m()) throw new Error('浏览器不支持PerformanceObserver')
                var e = O(r.FID, function (n) {
                  e && e.disconnect(),
                    t(r.FID, { value: n.startTime.toFixed(2), event: n.name })
                })
              })(this.setStore.bind(this)),
              (function (t) {
                if (!g()) throw new Error('浏览器不支持Navigator')
                var e = 'connection' in navigator ? navigator.connection : {},
                  n = {
                    downlink: e.downlink,
                    effectiveType: e.effectiveType,
                    rtt: e.rtt,
                  }
                t(r.NC, n)
              })(this.setStore.bind(this)),
              V(this.setStore.bind(this)),
              (function (t) {
                if (!MutationObserver)
                  throw new Error('浏览器不支持MutationObserver')
                var e = window.requestAnimationFrame
                    ? requestAnimationFrame
                    : setTimeout,
                  n = ['STYLE', 'SCRIPT', 'LINK', 'META']
                new MutationObserver(function (r) {
                  var o, i, a, s
                  $(t),
                    e(function () {
                      c.startTime = performance.now()
                    })
                  var c = { startTime: 0, children: [] }
                  try {
                    for (var u = k(r), f = u.next(); !f.done; f = u.next()) {
                      var p = f.value
                      if (p.addedNodes.length) {
                        var l = Array.from(p.addedNodes)
                        try {
                          for (
                            var h = ((a = void 0), k(l)), d = h.next();
                            !d.done;
                            d = h.next()
                          ) {
                            var v = d.value
                            1 !== v.nodeType ||
                              n.includes(null == v ? void 0 : v.tagName) ||
                              b(v, c.children) ||
                              c.children.push(v)
                          }
                        } catch (t) {
                          a = { error: t }
                        } finally {
                          try {
                            d && !d.done && (s = h.return) && s.call(h)
                          } finally {
                            if (a) throw a.error
                          }
                        }
                      }
                    }
                  } catch (t) {
                    o = { error: t }
                  } finally {
                    try {
                      f && !f.done && (i = u.return) && i.call(u)
                    } finally {
                      if (o) throw o.error
                    }
                  }
                  c.children.length && I.push(c)
                }).observe(document, { childList: !0, subtree: !0 })
              })(this.setStore.bind(this)),
              (function (t) {
                if (!y()) throw new Error('浏览器不支持Performance')
                if (!g()) throw new Error('浏览器不支持Navigator')
                var e = {
                  deviceMemory:
                    'deviceMemory' in navigator ? navigator.deviceMemory : 0,
                  hardwareConcurrency:
                    'hardwareConcurrency' in navigator
                      ? navigator.hardwareConcurrency
                      : 0,
                  jsHeapSizeLimit:
                    'memory' in performance
                      ? d(performance.memory.jsHeapSizeLimit)
                      : 0,
                  totalJSHeapSize:
                    'memory' in performance
                      ? d(performance.memory.totalJSHeapSize)
                      : 0,
                  usedJSHeapSize:
                    'memory' in performance
                      ? d(performance.memory.usedJSHeapSize)
                      : 0,
                }
                t(r.MRY, e)
              })(this.setStore.bind(this)),
              (function (t) {
                if (!window.location) throw new Error('浏览器不支持location')
                var e = location.host,
                  n = location.hostname,
                  o = location.href,
                  i = location.protocol,
                  a = location.origin,
                  s = location.port,
                  c = location.pathname,
                  u = location.search,
                  f = location.hash,
                  p = window.screen,
                  l = p.width,
                  h = p.height,
                  d = {
                    host: e,
                    hostname: n,
                    href: o,
                    protocol: i,
                    origin: a,
                    port: s,
                    pathname: c,
                    search: u,
                    hash: f,
                    userAgent:
                      'userAgent' in navigator ? navigator.userAgent : '',
                    screenResolution: ''.concat(l, '*').concat(h),
                  }
                t(r.DICE, d)
              })(this.setStore.bind(this)),
              this.report()
          }),
          (n.prototype.report = function () {
            var t = this
            ;[E, S, x].forEach(function (e) {
              e(function () {
                var e = t.newStore.getValues()
                Object.keys(e).forEach(function (n) {
                  t.reportInfo.send(e[n])
                }),
                  t.newStore.clear()
              })
            })
          }),
          (n.prototype.setStore = function (n, r) {
            var o = {
              type: t.PERFORMANCE,
              secondType: n,
              level: e.INFO,
              time: h(),
              value: r,
            }
            this.newStore.set(n, o)
          }),
          n
        )
      })()
      return (function () {
        function t(t) {
          this.init(t)
        }
        return (
          (t.prototype.init = function (t) {
            this.isSetCondition(t) &&
              (this.setDefault(t),
              t.isCollectPer && new N(t),
              t.isCollectErr && new j(t))
          }),
          (t.prototype.isSetCondition = function (t) {
            return t.url
              ? t.project
                ? t.version
                  ? !(
                      t.isVue &&
                      !t.vue &&
                      (console.log('如果isVue为true时,请在vue字段上传入Vue'), 1)
                    )
                  : (console.error('项目版本号必传'), !1)
                : (console.error('项目project必传'), !1)
              : (console.error('上报url必传'), !1)
          }),
          (t.prototype.setDefault = function (t) {
            Object.keys(i).forEach(function (e) {
              null == t[e] && (t[e] = i[e])
            })
          }),
          t
        )
      })()
    })()
  },
  function (t, e, n) {
    'use strict'
    n(1)
  },
  function (t, e, n) {
    'use strict'
    n.r(e)
    var r = n(0),
      o = n.n(r),
      i = function () {
        var t = this._self._c
        return t(
          'div',
          { staticClass: 'parent' },
          [
            t('router-link', { attrs: { to: '/home' } }, [this._v('home')]),
            this._v(' '),
            t('router-link', { attrs: { to: '/about' } }, [this._v('about')]),
            this._v(' '),
            t('router-view'),
          ],
          1
        )
      }
    i._withStripped = !0
    var s = {
      created: function () {
        ;(a = null), a.length
      },
    }
    n(3)
    function c(t, e, n, r, o, i, a, s) {
      var c,
        u = 'function' == typeof t ? t.options : t
      if (
        (e && ((u.render = e), (u.staticRenderFns = n), (u._compiled = !0)),
        r && (u.functional = !0),
        i && (u._scopeId = 'data-v-' + i),
        a
          ? ((c = function (t) {
              ;(t =
                t ||
                (this.$vnode && this.$vnode.ssrContext) ||
                (this.parent &&
                  this.parent.$vnode &&
                  this.parent.$vnode.ssrContext)) ||
                'undefined' == typeof __VUE_SSR_CONTEXT__ ||
                (t = __VUE_SSR_CONTEXT__),
                o && o.call(this, t),
                t && t._registeredComponents && t._registeredComponents.add(a)
            }),
            (u._ssrRegister = c))
          : o &&
            (c = s
              ? function () {
                  o.call(
                    this,
                    (u.functional ? this.parent : this).$root.$options
                      .shadowRoot
                  )
                }
              : o),
        c)
      )
        if (u.functional) {
          u._injectStyles = c
          var f = u.render
          u.render = function (t, e) {
            return c.call(e), f(t, e)
          }
        } else {
          var p = u.beforeCreate
          u.beforeCreate = p ? [].concat(p, c) : [c]
        }
      return { exports: t, options: u }
    }
    var u = c(s, i, [], !1, null, null, null).exports
    function f(t, e) {
      for (var n in e) t[n] = e[n]
      return t
    }
    var p = {
      name: 'RouterView',
      functional: !0,
      props: { name: { type: String, default: 'default' } },
      render: function (t, e) {
        var n = e.props,
          r = e.children,
          o = e.parent,
          i = e.data
        i.routerView = !0
        for (
          var a = o.$createElement,
            s = n.name,
            c = o.$route,
            u = o._routerViewCache || (o._routerViewCache = {}),
            p = 0,
            h = !1;
          o && o._routerRoot !== o;

        ) {
          var d = o.$vnode ? o.$vnode.data : {}
          d.routerView && p++,
            d.keepAlive && o._directInactive && o._inactive && (h = !0),
            (o = o.$parent)
        }
        if (((i.routerViewDepth = p), h)) {
          var v = u[s],
            y = v && v.component
          return y
            ? (v.configProps && l(y, i, v.route, v.configProps), a(y, i, r))
            : a()
        }
        var m = c.matched[p],
          g = m && m.components[s]
        if (!m || !g) return (u[s] = null), a()
        ;(u[s] = { component: g }),
          (i.registerRouteInstance = function (t, e) {
            var n = m.instances[s]
            ;((e && n !== t) || (!e && n === t)) && (m.instances[s] = e)
          }),
          ((i.hook || (i.hook = {})).prepatch = function (t, e) {
            m.instances[s] = e.componentInstance
          }),
          (i.hook.init = function (t) {
            t.data.keepAlive &&
              t.componentInstance &&
              t.componentInstance !== m.instances[s] &&
              (m.instances[s] = t.componentInstance)
          })
        var w = m.props && m.props[s]
        return (
          w && (f(u[s], { route: c, configProps: w }), l(g, i, c, w)),
          a(g, i, r)
        )
      },
    }
    function l(t, e, n, r) {
      var o = (e.props = (function (t, e) {
        switch (typeof e) {
          case 'undefined':
            return
          case 'object':
            return e
          case 'function':
            return e(t)
          case 'boolean':
            return e ? t.params : void 0
          default:
            0
        }
      })(n, r))
      if (o) {
        o = e.props = f({}, o)
        var i = (e.attrs = e.attrs || {})
        for (var a in o)
          (t.props && a in t.props) || ((i[a] = o[a]), delete o[a])
      }
    }
    var h = /[!'()*]/g,
      d = function (t) {
        return '%' + t.charCodeAt(0).toString(16)
      },
      v = /%2C/g,
      y = function (t) {
        return encodeURIComponent(t).replace(h, d).replace(v, ',')
      },
      m = decodeURIComponent
    var g = function (t) {
      return null == t ? t : String(t)
    }
    function w(t) {
      var e = {}
      return (t = t.trim().replace(/^(\?|#|&)/, ''))
        ? (t.split('&').forEach(function (t) {
            var n = t.replace(/\+/g, ' ').split('='),
              r = m(n.shift()),
              o = n.length > 0 ? m(n.join('=')) : null
            void 0 === e[r]
              ? (e[r] = o)
              : Array.isArray(e[r])
              ? e[r].push(o)
              : (e[r] = [e[r], o])
          }),
          e)
        : e
    }
    function b(t) {
      var e = t
        ? Object.keys(t)
            .map(function (e) {
              var n = t[e]
              if (void 0 === n) return ''
              if (null === n) return y(e)
              if (Array.isArray(n)) {
                var r = []
                return (
                  n.forEach(function (t) {
                    void 0 !== t &&
                      (null === t ? r.push(y(e)) : r.push(y(e) + '=' + y(t)))
                  }),
                  r.join('&')
                )
              }
              return y(e) + '=' + y(n)
            })
            .filter(function (t) {
              return t.length > 0
            })
            .join('&')
        : null
      return e ? '?' + e : ''
    }
    var E = /\/?$/
    function S(t, e, n, r) {
      var o = r && r.options.stringifyQuery,
        i = e.query || {}
      try {
        i = x(i)
      } catch (t) {}
      var a = {
        name: e.name || (t && t.name),
        meta: (t && t.meta) || {},
        path: e.path || '/',
        hash: e.hash || '',
        query: i,
        params: e.params || {},
        fullPath: k(e, o),
        matched: t ? C(t) : [],
      }
      return n && (a.redirectedFrom = k(n, o)), Object.freeze(a)
    }
    function x(t) {
      if (Array.isArray(t)) return t.map(x)
      if (t && 'object' == typeof t) {
        var e = {}
        for (var n in t) e[n] = x(t[n])
        return e
      }
      return t
    }
    var R = S(null, { path: '/' })
    function C(t) {
      for (var e = []; t; ) e.unshift(t), (t = t.parent)
      return e
    }
    function k(t, e) {
      var n = t.path,
        r = t.query
      void 0 === r && (r = {})
      var o = t.hash
      return void 0 === o && (o = ''), (n || '/') + (e || b)(r) + o
    }
    function _(t, e) {
      return e === R
        ? t === e
        : !!e &&
            (t.path && e.path
              ? t.path.replace(E, '') === e.path.replace(E, '') &&
                t.hash === e.hash &&
                O(t.query, e.query)
              : !(!t.name || !e.name) &&
                t.name === e.name &&
                t.hash === e.hash &&
                O(t.query, e.query) &&
                O(t.params, e.params))
    }
    function O(t, e) {
      if ((void 0 === t && (t = {}), void 0 === e && (e = {}), !t || !e))
        return t === e
      var n = Object.keys(t),
        r = Object.keys(e)
      return (
        n.length === r.length &&
        n.every(function (n) {
          var r = t[n],
            o = e[n]
          return null == r || null == o
            ? r === o
            : 'object' == typeof r && 'object' == typeof o
            ? O(r, o)
            : String(r) === String(o)
        })
      )
    }
    function j(t, e, n) {
      var r = t.charAt(0)
      if ('/' === r) return t
      if ('?' === r || '#' === r) return e + t
      var o = e.split('/')
      ;(n && o[o.length - 1]) || o.pop()
      for (var i = t.replace(/^\//, '').split('/'), a = 0; a < i.length; a++) {
        var s = i[a]
        '..' === s ? o.pop() : '.' !== s && o.push(s)
      }
      return '' !== o[0] && o.unshift(''), o.join('/')
    }
    function A(t) {
      return t.replace(/\/\//g, '/')
    }
    var T =
        Array.isArray ||
        function (t) {
          return '[object Array]' == Object.prototype.toString.call(t)
        },
      L = z,
      P = M,
      I = function (t, e) {
        return N(M(t, e), e)
      },
      F = N,
      $ = J,
      U = new RegExp(
        [
          '(\\\\.)',
          '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))',
        ].join('|'),
        'g'
      )
    function M(t, e) {
      for (
        var n, r = [], o = 0, i = 0, a = '', s = (e && e.delimiter) || '/';
        null != (n = U.exec(t));

      ) {
        var c = n[0],
          u = n[1],
          f = n.index
        if (((a += t.slice(i, f)), (i = f + c.length), u)) a += u[1]
        else {
          var p = t[i],
            l = n[2],
            h = n[3],
            d = n[4],
            v = n[5],
            y = n[6],
            m = n[7]
          a && (r.push(a), (a = ''))
          var g = null != l && null != p && p !== l,
            w = '+' === y || '*' === y,
            b = '?' === y || '*' === y,
            E = n[2] || s,
            S = d || v
          r.push({
            name: h || o++,
            prefix: l || '',
            delimiter: E,
            optional: b,
            repeat: w,
            partial: g,
            asterisk: !!m,
            pattern: S ? B(S) : m ? '.*' : '[^' + q(E) + ']+?',
          })
        }
      }
      return i < t.length && (a += t.substr(i)), a && r.push(a), r
    }
    function V(t) {
      return encodeURI(t).replace(/[\/?#]/g, function (t) {
        return '%' + t.charCodeAt(0).toString(16).toUpperCase()
      })
    }
    function N(t, e) {
      for (var n = new Array(t.length), r = 0; r < t.length; r++)
        'object' == typeof t[r] &&
          (n[r] = new RegExp('^(?:' + t[r].pattern + ')$', D(e)))
      return function (e, r) {
        for (
          var o = '',
            i = e || {},
            a = (r || {}).pretty ? V : encodeURIComponent,
            s = 0;
          s < t.length;
          s++
        ) {
          var c = t[s]
          if ('string' != typeof c) {
            var u,
              f = i[c.name]
            if (null == f) {
              if (c.optional) {
                c.partial && (o += c.prefix)
                continue
              }
              throw new TypeError('Expected "' + c.name + '" to be defined')
            }
            if (T(f)) {
              if (!c.repeat)
                throw new TypeError(
                  'Expected "' +
                    c.name +
                    '" to not repeat, but received `' +
                    JSON.stringify(f) +
                    '`'
                )
              if (0 === f.length) {
                if (c.optional) continue
                throw new TypeError('Expected "' + c.name + '" to not be empty')
              }
              for (var p = 0; p < f.length; p++) {
                if (((u = a(f[p])), !n[s].test(u)))
                  throw new TypeError(
                    'Expected all "' +
                      c.name +
                      '" to match "' +
                      c.pattern +
                      '", but received `' +
                      JSON.stringify(u) +
                      '`'
                  )
                o += (0 === p ? c.prefix : c.delimiter) + u
              }
            } else {
              if (
                ((u = c.asterisk
                  ? encodeURI(f).replace(/[?#]/g, function (t) {
                      return '%' + t.charCodeAt(0).toString(16).toUpperCase()
                    })
                  : a(f)),
                !n[s].test(u))
              )
                throw new TypeError(
                  'Expected "' +
                    c.name +
                    '" to match "' +
                    c.pattern +
                    '", but received "' +
                    u +
                    '"'
                )
              o += c.prefix + u
            }
          } else o += c
        }
        return o
      }
    }
    function q(t) {
      return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
    }
    function B(t) {
      return t.replace(/([=!:$\/()])/g, '\\$1')
    }
    function H(t, e) {
      return (t.keys = e), t
    }
    function D(t) {
      return t && t.sensitive ? '' : 'i'
    }
    function J(t, e, n) {
      T(e) || ((n = e || n), (e = []))
      for (
        var r = (n = n || {}).strict, o = !1 !== n.end, i = '', a = 0;
        a < t.length;
        a++
      ) {
        var s = t[a]
        if ('string' == typeof s) i += q(s)
        else {
          var c = q(s.prefix),
            u = '(?:' + s.pattern + ')'
          e.push(s),
            s.repeat && (u += '(?:' + c + u + ')*'),
            (i += u =
              s.optional
                ? s.partial
                  ? c + '(' + u + ')?'
                  : '(?:' + c + '(' + u + '))?'
                : c + '(' + u + ')')
        }
      }
      var f = q(n.delimiter || '/'),
        p = i.slice(-f.length) === f
      return (
        r || (i = (p ? i.slice(0, -f.length) : i) + '(?:' + f + '(?=$))?'),
        (i += o ? '$' : r && p ? '' : '(?=' + f + '|$)'),
        H(new RegExp('^' + i, D(n)), e)
      )
    }
    function z(t, e, n) {
      return (
        T(e) || ((n = e || n), (e = [])),
        (n = n || {}),
        t instanceof RegExp
          ? (function (t, e) {
              var n = t.source.match(/\((?!\?)/g)
              if (n)
                for (var r = 0; r < n.length; r++)
                  e.push({
                    name: r,
                    prefix: null,
                    delimiter: null,
                    optional: !1,
                    repeat: !1,
                    partial: !1,
                    asterisk: !1,
                    pattern: null,
                  })
              return H(t, e)
            })(t, e)
          : T(t)
          ? (function (t, e, n) {
              for (var r = [], o = 0; o < t.length; o++)
                r.push(z(t[o], e, n).source)
              return H(new RegExp('(?:' + r.join('|') + ')', D(n)), e)
            })(t, e, n)
          : (function (t, e, n) {
              return J(M(t, n), e, n)
            })(t, e, n)
      )
    }
    ;(L.parse = P),
      (L.compile = I),
      (L.tokensToFunction = F),
      (L.tokensToRegExp = $)
    var X = Object.create(null)
    function W(t, e, n) {
      e = e || {}
      try {
        var r = X[t] || (X[t] = L.compile(t))
        return (
          'string' == typeof e.pathMatch && (e[0] = e.pathMatch),
          r(e, { pretty: !0 })
        )
      } catch (t) {
        return ''
      } finally {
        delete e[0]
      }
    }
    function K(t, e, n, r) {
      var o = 'string' == typeof t ? { path: t } : t
      if (o._normalized) return o
      if (o.name) {
        var i = (o = f({}, t)).params
        return i && 'object' == typeof i && (o.params = f({}, i)), o
      }
      if (!o.path && o.params && e) {
        ;(o = f({}, o))._normalized = !0
        var a = f(f({}, e.params), o.params)
        if (e.name) (o.name = e.name), (o.params = a)
        else if (e.matched.length) {
          var s = e.matched[e.matched.length - 1].path
          o.path = W(s, a, e.path)
        } else 0
        return o
      }
      var c = (function (t) {
          var e = '',
            n = '',
            r = t.indexOf('#')
          r >= 0 && ((e = t.slice(r)), (t = t.slice(0, r)))
          var o = t.indexOf('?')
          return (
            o >= 0 && ((n = t.slice(o + 1)), (t = t.slice(0, o))),
            { path: t, query: n, hash: e }
          )
        })(o.path || ''),
        u = (e && e.path) || '/',
        p = c.path ? j(c.path, u, n || o.append) : u,
        l = (function (t, e, n) {
          void 0 === e && (e = {})
          var r,
            o = n || w
          try {
            r = o(t || '')
          } catch (t) {
            r = {}
          }
          for (var i in e) {
            var a = e[i]
            r[i] = Array.isArray(a) ? a.map(g) : g(a)
          }
          return r
        })(c.query, o.query, r && r.options.parseQuery),
        h = o.hash || c.hash
      return (
        h && '#' !== h.charAt(0) && (h = '#' + h),
        { _normalized: !0, path: p, query: l, hash: h }
      )
    }
    var Y,
      Q = function () {},
      G = {
        name: 'RouterLink',
        props: {
          to: { type: [String, Object], required: !0 },
          tag: { type: String, default: 'a' },
          exact: Boolean,
          append: Boolean,
          replace: Boolean,
          activeClass: String,
          exactActiveClass: String,
          ariaCurrentValue: { type: String, default: 'page' },
          event: { type: [String, Array], default: 'click' },
        },
        render: function (t) {
          var e = this,
            n = this.$router,
            r = this.$route,
            o = n.resolve(this.to, r, this.append),
            i = o.location,
            a = o.route,
            s = o.href,
            c = {},
            u = n.options.linkActiveClass,
            p = n.options.linkExactActiveClass,
            l = null == u ? 'router-link-active' : u,
            h = null == p ? 'router-link-exact-active' : p,
            d = null == this.activeClass ? l : this.activeClass,
            v = null == this.exactActiveClass ? h : this.exactActiveClass,
            y = a.redirectedFrom ? S(null, K(a.redirectedFrom), null, n) : a
          ;(c[v] = _(r, y)),
            (c[d] = this.exact
              ? c[v]
              : (function (t, e) {
                  return (
                    0 ===
                      t.path.replace(E, '/').indexOf(e.path.replace(E, '/')) &&
                    (!e.hash || t.hash === e.hash) &&
                    (function (t, e) {
                      for (var n in e) if (!(n in t)) return !1
                      return !0
                    })(t.query, e.query)
                  )
                })(r, y))
          var m = c[v] ? this.ariaCurrentValue : null,
            g = function (t) {
              Z(t) && (e.replace ? n.replace(i, Q) : n.push(i, Q))
            },
            w = { click: Z }
          Array.isArray(this.event)
            ? this.event.forEach(function (t) {
                w[t] = g
              })
            : (w[this.event] = g)
          var b = { class: c },
            x =
              !this.$scopedSlots.$hasNormal &&
              this.$scopedSlots.default &&
              this.$scopedSlots.default({
                href: s,
                route: a,
                navigate: g,
                isActive: c[d],
                isExactActive: c[v],
              })
          if (x) {
            if (1 === x.length) return x[0]
            if (x.length > 1 || !x.length)
              return 0 === x.length ? t() : t('span', {}, x)
          }
          if ('a' === this.tag)
            (b.on = w), (b.attrs = { href: s, 'aria-current': m })
          else {
            var R = (function t(e) {
              var n
              if (e)
                for (var r = 0; r < e.length; r++) {
                  if ('a' === (n = e[r]).tag) return n
                  if (n.children && (n = t(n.children))) return n
                }
            })(this.$slots.default)
            if (R) {
              R.isStatic = !1
              var C = (R.data = f({}, R.data))
              for (var k in ((C.on = C.on || {}), C.on)) {
                var O = C.on[k]
                k in w && (C.on[k] = Array.isArray(O) ? O : [O])
              }
              for (var j in w) j in C.on ? C.on[j].push(w[j]) : (C.on[j] = g)
              var A = (R.data.attrs = f({}, R.data.attrs))
              ;(A.href = s), (A['aria-current'] = m)
            } else b.on = w
          }
          return t(this.tag, b, this.$slots.default)
        },
      }
    function Z(t) {
      if (
        !(
          t.metaKey ||
          t.altKey ||
          t.ctrlKey ||
          t.shiftKey ||
          t.defaultPrevented ||
          (void 0 !== t.button && 0 !== t.button)
        )
      ) {
        if (t.currentTarget && t.currentTarget.getAttribute) {
          var e = t.currentTarget.getAttribute('target')
          if (/\b_blank\b/i.test(e)) return
        }
        return t.preventDefault && t.preventDefault(), !0
      }
    }
    var tt = 'undefined' != typeof window
    function et(t, e, n, r) {
      var o = e || [],
        i = n || Object.create(null),
        a = r || Object.create(null)
      t.forEach(function (t) {
        !(function t(e, n, r, o, i, a) {
          var s = o.path,
            c = o.name
          0
          var u = o.pathToRegexpOptions || {},
            f = (function (t, e, n) {
              n || (t = t.replace(/\/$/, ''))
              if ('/' === t[0]) return t
              if (null == e) return t
              return A(e.path + '/' + t)
            })(s, i, u.strict)
          'boolean' == typeof o.caseSensitive && (u.sensitive = o.caseSensitive)
          var p = {
            path: f,
            regex: nt(f, u),
            components: o.components || { default: o.component },
            instances: {},
            name: c,
            parent: i,
            matchAs: a,
            redirect: o.redirect,
            beforeEnter: o.beforeEnter,
            meta: o.meta || {},
            props:
              null == o.props
                ? {}
                : o.components
                ? o.props
                : { default: o.props },
          }
          o.children &&
            o.children.forEach(function (o) {
              var i = a ? A(a + '/' + o.path) : void 0
              t(e, n, r, o, p, i)
            })
          n[p.path] || (e.push(p.path), (n[p.path] = p))
          if (void 0 !== o.alias)
            for (
              var l = Array.isArray(o.alias) ? o.alias : [o.alias], h = 0;
              h < l.length;
              ++h
            ) {
              0
              var d = { path: l[h], children: o.children }
              t(e, n, r, d, i, p.path || '/')
            }
          c && (r[c] || (r[c] = p))
        })(o, i, a, t)
      })
      for (var s = 0, c = o.length; s < c; s++)
        '*' === o[s] && (o.push(o.splice(s, 1)[0]), c--, s--)
      return { pathList: o, pathMap: i, nameMap: a }
    }
    function nt(t, e) {
      return L(t, [], e)
    }
    function rt(t, e) {
      var n = et(t),
        r = n.pathList,
        o = n.pathMap,
        i = n.nameMap
      function a(t, n, a) {
        var s = K(t, n, !1, e),
          u = s.name
        if (u) {
          var f = i[u]
          if (!f) return c(null, s)
          var p = f.regex.keys
            .filter(function (t) {
              return !t.optional
            })
            .map(function (t) {
              return t.name
            })
          if (
            ('object' != typeof s.params && (s.params = {}),
            n && 'object' == typeof n.params)
          )
            for (var l in n.params)
              !(l in s.params) &&
                p.indexOf(l) > -1 &&
                (s.params[l] = n.params[l])
          return (s.path = W(f.path, s.params)), c(f, s, a)
        }
        if (s.path) {
          s.params = {}
          for (var h = 0; h < r.length; h++) {
            var d = r[h],
              v = o[d]
            if (ot(v.regex, s.path, s.params)) return c(v, s, a)
          }
        }
        return c(null, s)
      }
      function s(t, n) {
        var r = t.redirect,
          o = 'function' == typeof r ? r(S(t, n, null, e)) : r
        if (
          ('string' == typeof o && (o = { path: o }),
          !o || 'object' != typeof o)
        )
          return c(null, n)
        var s = o,
          u = s.name,
          f = s.path,
          p = n.query,
          l = n.hash,
          h = n.params
        if (
          ((p = s.hasOwnProperty('query') ? s.query : p),
          (l = s.hasOwnProperty('hash') ? s.hash : l),
          (h = s.hasOwnProperty('params') ? s.params : h),
          u)
        ) {
          i[u]
          return a(
            { _normalized: !0, name: u, query: p, hash: l, params: h },
            void 0,
            n
          )
        }
        if (f) {
          var d = (function (t, e) {
            return j(t, e.parent ? e.parent.path : '/', !0)
          })(f, t)
          return a(
            { _normalized: !0, path: W(d, h), query: p, hash: l },
            void 0,
            n
          )
        }
        return c(null, n)
      }
      function c(t, n, r) {
        return t && t.redirect
          ? s(t, r || n)
          : t && t.matchAs
          ? (function (t, e, n) {
              var r = a({ _normalized: !0, path: W(n, e.params) })
              if (r) {
                var o = r.matched,
                  i = o[o.length - 1]
                return (e.params = r.params), c(i, e)
              }
              return c(null, e)
            })(0, n, t.matchAs)
          : S(t, n, r, e)
      }
      return {
        match: a,
        addRoutes: function (t) {
          et(t, r, o, i)
        },
      }
    }
    function ot(t, e, n) {
      var r = e.match(t)
      if (!r) return !1
      if (!n) return !0
      for (var o = 1, i = r.length; o < i; ++o) {
        var a = t.keys[o - 1],
          s = 'string' == typeof r[o] ? decodeURIComponent(r[o]) : r[o]
        a && (n[a.name || 'pathMatch'] = s)
      }
      return !0
    }
    var it =
      tt && window.performance && window.performance.now
        ? window.performance
        : Date
    function at() {
      return it.now().toFixed(3)
    }
    var st = at()
    function ct() {
      return st
    }
    function ut(t) {
      return (st = t)
    }
    var ft = Object.create(null)
    function pt() {
      'scrollRestoration' in window.history &&
        (window.history.scrollRestoration = 'manual')
      var t = window.location.protocol + '//' + window.location.host,
        e = window.location.href.replace(t, ''),
        n = f({}, window.history.state)
      return (
        (n.key = ct()),
        window.history.replaceState(n, '', e),
        window.addEventListener('popstate', dt),
        function () {
          window.removeEventListener('popstate', dt)
        }
      )
    }
    function lt(t, e, n, r) {
      if (t.app) {
        var o = t.options.scrollBehavior
        o &&
          t.app.$nextTick(function () {
            var i = (function () {
                var t = ct()
                if (t) return ft[t]
              })(),
              a = o.call(t, e, n, r ? i : null)
            a &&
              ('function' == typeof a.then
                ? a
                    .then(function (t) {
                      wt(t, i)
                    })
                    .catch(function (t) {
                      0
                    })
                : wt(a, i))
          })
      }
    }
    function ht() {
      var t = ct()
      t && (ft[t] = { x: window.pageXOffset, y: window.pageYOffset })
    }
    function dt(t) {
      ht(), t.state && t.state.key && ut(t.state.key)
    }
    function vt(t) {
      return mt(t.x) || mt(t.y)
    }
    function yt(t) {
      return {
        x: mt(t.x) ? t.x : window.pageXOffset,
        y: mt(t.y) ? t.y : window.pageYOffset,
      }
    }
    function mt(t) {
      return 'number' == typeof t
    }
    var gt = /^#\d/
    function wt(t, e) {
      var n,
        r = 'object' == typeof t
      if (r && 'string' == typeof t.selector) {
        var o = gt.test(t.selector)
          ? document.getElementById(t.selector.slice(1))
          : document.querySelector(t.selector)
        if (o) {
          var i = t.offset && 'object' == typeof t.offset ? t.offset : {}
          e = (function (t, e) {
            var n = document.documentElement.getBoundingClientRect(),
              r = t.getBoundingClientRect()
            return { x: r.left - n.left - e.x, y: r.top - n.top - e.y }
          })(o, (i = { x: mt((n = i).x) ? n.x : 0, y: mt(n.y) ? n.y : 0 }))
        } else vt(t) && (e = yt(t))
      } else r && vt(t) && (e = yt(t))
      e && window.scrollTo(e.x, e.y)
    }
    var bt,
      Et =
        tt &&
        ((-1 === (bt = window.navigator.userAgent).indexOf('Android 2.') &&
          -1 === bt.indexOf('Android 4.0')) ||
          -1 === bt.indexOf('Mobile Safari') ||
          -1 !== bt.indexOf('Chrome') ||
          -1 !== bt.indexOf('Windows Phone')) &&
        window.history &&
        'function' == typeof window.history.pushState
    function St(t, e) {
      ht()
      var n = window.history
      try {
        if (e) {
          var r = f({}, n.state)
          ;(r.key = ct()), n.replaceState(r, '', t)
        } else n.pushState({ key: ut(at()) }, '', t)
      } catch (n) {
        window.location[e ? 'replace' : 'assign'](t)
      }
    }
    function xt(t) {
      St(t, !0)
    }
    function Rt(t, e, n) {
      var r = function (o) {
        o >= t.length
          ? n()
          : t[o]
          ? e(t[o], function () {
              r(o + 1)
            })
          : r(o + 1)
      }
      r(0)
    }
    var Ct = { redirected: 2, aborted: 4, cancelled: 8, duplicated: 16 }
    function kt(t, e) {
      return Ot(
        t,
        e,
        Ct.redirected,
        'Redirected when going from "' +
          t.fullPath +
          '" to "' +
          (function (t) {
            if ('string' == typeof t) return t
            if ('path' in t) return t.path
            var e = {}
            return (
              jt.forEach(function (n) {
                n in t && (e[n] = t[n])
              }),
              JSON.stringify(e, null, 2)
            )
          })(e) +
          '" via a navigation guard.'
      )
    }
    function _t(t, e) {
      return Ot(
        t,
        e,
        Ct.cancelled,
        'Navigation cancelled from "' +
          t.fullPath +
          '" to "' +
          e.fullPath +
          '" with a new navigation.'
      )
    }
    function Ot(t, e, n, r) {
      var o = new Error(r)
      return (o._isRouter = !0), (o.from = t), (o.to = e), (o.type = n), o
    }
    var jt = ['params', 'query', 'hash']
    function At(t) {
      return Object.prototype.toString.call(t).indexOf('Error') > -1
    }
    function Tt(t, e) {
      return At(t) && t._isRouter && (null == e || t.type === e)
    }
    function Lt(t) {
      return function (e, n, r) {
        var o = !1,
          i = 0,
          a = null
        Pt(t, function (t, e, n, s) {
          if ('function' == typeof t && void 0 === t.cid) {
            ;(o = !0), i++
            var c,
              u = $t(function (e) {
                var o
                ;((o = e).__esModule ||
                  (Ft && 'Module' === o[Symbol.toStringTag])) &&
                  (e = e.default),
                  (t.resolved = 'function' == typeof e ? e : Y.extend(e)),
                  (n.components[s] = e),
                  --i <= 0 && r()
              }),
              f = $t(function (t) {
                var e = 'Failed to resolve async component ' + s + ': ' + t
                a || ((a = At(t) ? t : new Error(e)), r(a))
              })
            try {
              c = t(u, f)
            } catch (t) {
              f(t)
            }
            if (c)
              if ('function' == typeof c.then) c.then(u, f)
              else {
                var p = c.component
                p && 'function' == typeof p.then && p.then(u, f)
              }
          }
        }),
          o || r()
      }
    }
    function Pt(t, e) {
      return It(
        t.map(function (t) {
          return Object.keys(t.components).map(function (n) {
            return e(t.components[n], t.instances[n], t, n)
          })
        })
      )
    }
    function It(t) {
      return Array.prototype.concat.apply([], t)
    }
    var Ft =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.toStringTag
    function $t(t) {
      var e = !1
      return function () {
        for (var n = [], r = arguments.length; r--; ) n[r] = arguments[r]
        if (!e) return (e = !0), t.apply(this, n)
      }
    }
    var Ut = function (t, e) {
      ;(this.router = t),
        (this.base = (function (t) {
          if (!t)
            if (tt) {
              var e = document.querySelector('base')
              t = (t = (e && e.getAttribute('href')) || '/').replace(
                /^https?:\/\/[^\/]+/,
                ''
              )
            } else t = '/'
          '/' !== t.charAt(0) && (t = '/' + t)
          return t.replace(/\/$/, '')
        })(e)),
        (this.current = R),
        (this.pending = null),
        (this.ready = !1),
        (this.readyCbs = []),
        (this.readyErrorCbs = []),
        (this.errorCbs = []),
        (this.listeners = [])
    }
    function Mt(t, e, n, r) {
      var o = Pt(t, function (t, r, o, i) {
        var a = (function (t, e) {
          'function' != typeof t && (t = Y.extend(t))
          return t.options[e]
        })(t, e)
        if (a)
          return Array.isArray(a)
            ? a.map(function (t) {
                return n(t, r, o, i)
              })
            : n(a, r, o, i)
      })
      return It(r ? o.reverse() : o)
    }
    function Vt(t, e) {
      if (e)
        return function () {
          return t.apply(e, arguments)
        }
    }
    ;(Ut.prototype.listen = function (t) {
      this.cb = t
    }),
      (Ut.prototype.onReady = function (t, e) {
        this.ready
          ? t()
          : (this.readyCbs.push(t), e && this.readyErrorCbs.push(e))
      }),
      (Ut.prototype.onError = function (t) {
        this.errorCbs.push(t)
      }),
      (Ut.prototype.transitionTo = function (t, e, n) {
        var r,
          o = this
        try {
          r = this.router.match(t, this.current)
        } catch (t) {
          throw (
            (this.errorCbs.forEach(function (e) {
              e(t)
            }),
            t)
          )
        }
        this.confirmTransition(
          r,
          function () {
            var t = o.current
            o.updateRoute(r),
              e && e(r),
              o.ensureURL(),
              o.router.afterHooks.forEach(function (e) {
                e && e(r, t)
              }),
              o.ready ||
                ((o.ready = !0),
                o.readyCbs.forEach(function (t) {
                  t(r)
                }))
          },
          function (t) {
            n && n(t),
              t &&
                !o.ready &&
                ((o.ready = !0),
                Tt(t, Ct.redirected)
                  ? o.readyCbs.forEach(function (t) {
                      t(r)
                    })
                  : o.readyErrorCbs.forEach(function (e) {
                      e(t)
                    }))
          }
        )
      }),
      (Ut.prototype.confirmTransition = function (t, e, n) {
        var r,
          o,
          i = this,
          a = this.current,
          s = function (t) {
            !Tt(t) &&
              At(t) &&
              (i.errorCbs.length
                ? i.errorCbs.forEach(function (e) {
                    e(t)
                  })
                : console.error(t)),
              n && n(t)
          },
          c = t.matched.length - 1,
          u = a.matched.length - 1
        if (_(t, a) && c === u && t.matched[c] === a.matched[u])
          return (
            this.ensureURL(),
            s(
              (((o = Ot(
                (r = a),
                t,
                Ct.duplicated,
                'Avoided redundant navigation to current location: "' +
                  r.fullPath +
                  '".'
              )).name = 'NavigationDuplicated'),
              o)
            )
          )
        var f = (function (t, e) {
            var n,
              r = Math.max(t.length, e.length)
            for (n = 0; n < r && t[n] === e[n]; n++);
            return {
              updated: e.slice(0, n),
              activated: e.slice(n),
              deactivated: t.slice(n),
            }
          })(this.current.matched, t.matched),
          p = f.updated,
          l = f.deactivated,
          h = f.activated,
          d = [].concat(
            (function (t) {
              return Mt(t, 'beforeRouteLeave', Vt, !0)
            })(l),
            this.router.beforeHooks,
            (function (t) {
              return Mt(t, 'beforeRouteUpdate', Vt)
            })(p),
            h.map(function (t) {
              return t.beforeEnter
            }),
            Lt(h)
          )
        this.pending = t
        var v = function (e, n) {
          if (i.pending !== t) return s(_t(a, t))
          try {
            e(t, a, function (e) {
              !1 === e
                ? (i.ensureURL(!0),
                  s(
                    (function (t, e) {
                      return Ot(
                        t,
                        e,
                        Ct.aborted,
                        'Navigation aborted from "' +
                          t.fullPath +
                          '" to "' +
                          e.fullPath +
                          '" via a navigation guard.'
                      )
                    })(a, t)
                  ))
                : At(e)
                ? (i.ensureURL(!0), s(e))
                : 'string' == typeof e ||
                  ('object' == typeof e &&
                    ('string' == typeof e.path || 'string' == typeof e.name))
                ? (s(kt(a, t)),
                  'object' == typeof e && e.replace ? i.replace(e) : i.push(e))
                : n(e)
            })
          } catch (t) {
            s(t)
          }
        }
        Rt(d, v, function () {
          var n = []
          Rt(
            (function (t, e, n) {
              return Mt(t, 'beforeRouteEnter', function (t, r, o, i) {
                return (function (t, e, n, r, o) {
                  return function (i, a, s) {
                    return t(i, a, function (t) {
                      'function' == typeof t &&
                        r.push(function () {
                          !(function t(e, n, r, o) {
                            n[r] && !n[r]._isBeingDestroyed
                              ? e(n[r])
                              : o() &&
                                setTimeout(function () {
                                  t(e, n, r, o)
                                }, 16)
                          })(t, e.instances, n, o)
                        }),
                        s(t)
                    })
                  }
                })(t, o, i, e, n)
              })
            })(h, n, function () {
              return i.current === t
            }).concat(i.router.resolveHooks),
            v,
            function () {
              if (i.pending !== t) return s(_t(a, t))
              ;(i.pending = null),
                e(t),
                i.router.app &&
                  i.router.app.$nextTick(function () {
                    n.forEach(function (t) {
                      t()
                    })
                  })
            }
          )
        })
      }),
      (Ut.prototype.updateRoute = function (t) {
        ;(this.current = t), this.cb && this.cb(t)
      }),
      (Ut.prototype.setupListeners = function () {}),
      (Ut.prototype.teardownListeners = function () {
        this.listeners.forEach(function (t) {
          t()
        }),
          (this.listeners = [])
      })
    var Nt = (function (t) {
      function e(e, n) {
        t.call(this, e, n), (this._startLocation = qt(this.base))
      }
      return (
        t && (e.__proto__ = t),
        (e.prototype = Object.create(t && t.prototype)),
        (e.prototype.constructor = e),
        (e.prototype.setupListeners = function () {
          var t = this
          if (!(this.listeners.length > 0)) {
            var e = this.router,
              n = e.options.scrollBehavior,
              r = Et && n
            r && this.listeners.push(pt())
            var o = function () {
              var n = t.current,
                o = qt(t.base)
              ;(t.current === R && o === t._startLocation) ||
                t.transitionTo(o, function (t) {
                  r && lt(e, t, n, !0)
                })
            }
            window.addEventListener('popstate', o),
              this.listeners.push(function () {
                window.removeEventListener('popstate', o)
              })
          }
        }),
        (e.prototype.go = function (t) {
          window.history.go(t)
        }),
        (e.prototype.push = function (t, e, n) {
          var r = this,
            o = this.current
          this.transitionTo(
            t,
            function (t) {
              St(A(r.base + t.fullPath)), lt(r.router, t, o, !1), e && e(t)
            },
            n
          )
        }),
        (e.prototype.replace = function (t, e, n) {
          var r = this,
            o = this.current
          this.transitionTo(
            t,
            function (t) {
              xt(A(r.base + t.fullPath)), lt(r.router, t, o, !1), e && e(t)
            },
            n
          )
        }),
        (e.prototype.ensureURL = function (t) {
          if (qt(this.base) !== this.current.fullPath) {
            var e = A(this.base + this.current.fullPath)
            t ? St(e) : xt(e)
          }
        }),
        (e.prototype.getCurrentLocation = function () {
          return qt(this.base)
        }),
        e
      )
    })(Ut)
    function qt(t) {
      var e = decodeURI(window.location.pathname)
      return (
        t &&
          0 === e.toLowerCase().indexOf(t.toLowerCase()) &&
          (e = e.slice(t.length)),
        (e || '/') + window.location.search + window.location.hash
      )
    }
    var Bt = (function (t) {
      function e(e, n, r) {
        t.call(this, e, n),
          (r &&
            (function (t) {
              var e = qt(t)
              if (!/^\/#/.test(e))
                return window.location.replace(A(t + '/#' + e)), !0
            })(this.base)) ||
            Ht()
      }
      return (
        t && (e.__proto__ = t),
        (e.prototype = Object.create(t && t.prototype)),
        (e.prototype.constructor = e),
        (e.prototype.setupListeners = function () {
          var t = this
          if (!(this.listeners.length > 0)) {
            var e = this.router.options.scrollBehavior,
              n = Et && e
            n && this.listeners.push(pt())
            var r = function () {
                var e = t.current
                Ht() &&
                  t.transitionTo(Dt(), function (r) {
                    n && lt(t.router, r, e, !0), Et || Xt(r.fullPath)
                  })
              },
              o = Et ? 'popstate' : 'hashchange'
            window.addEventListener(o, r),
              this.listeners.push(function () {
                window.removeEventListener(o, r)
              })
          }
        }),
        (e.prototype.push = function (t, e, n) {
          var r = this,
            o = this.current
          this.transitionTo(
            t,
            function (t) {
              zt(t.fullPath), lt(r.router, t, o, !1), e && e(t)
            },
            n
          )
        }),
        (e.prototype.replace = function (t, e, n) {
          var r = this,
            o = this.current
          this.transitionTo(
            t,
            function (t) {
              Xt(t.fullPath), lt(r.router, t, o, !1), e && e(t)
            },
            n
          )
        }),
        (e.prototype.go = function (t) {
          window.history.go(t)
        }),
        (e.prototype.ensureURL = function (t) {
          var e = this.current.fullPath
          Dt() !== e && (t ? zt(e) : Xt(e))
        }),
        (e.prototype.getCurrentLocation = function () {
          return Dt()
        }),
        e
      )
    })(Ut)
    function Ht() {
      var t = Dt()
      return '/' === t.charAt(0) || (Xt('/' + t), !1)
    }
    function Dt() {
      var t = window.location.href,
        e = t.indexOf('#')
      if (e < 0) return ''
      var n = (t = t.slice(e + 1)).indexOf('?')
      if (n < 0) {
        var r = t.indexOf('#')
        t = r > -1 ? decodeURI(t.slice(0, r)) + t.slice(r) : decodeURI(t)
      } else t = decodeURI(t.slice(0, n)) + t.slice(n)
      return t
    }
    function Jt(t) {
      var e = window.location.href,
        n = e.indexOf('#')
      return (n >= 0 ? e.slice(0, n) : e) + '#' + t
    }
    function zt(t) {
      Et ? St(Jt(t)) : (window.location.hash = t)
    }
    function Xt(t) {
      Et ? xt(Jt(t)) : window.location.replace(Jt(t))
    }
    var Wt = (function (t) {
        function e(e, n) {
          t.call(this, e, n), (this.stack = []), (this.index = -1)
        }
        return (
          t && (e.__proto__ = t),
          (e.prototype = Object.create(t && t.prototype)),
          (e.prototype.constructor = e),
          (e.prototype.push = function (t, e, n) {
            var r = this
            this.transitionTo(
              t,
              function (t) {
                ;(r.stack = r.stack.slice(0, r.index + 1).concat(t)),
                  r.index++,
                  e && e(t)
              },
              n
            )
          }),
          (e.prototype.replace = function (t, e, n) {
            var r = this
            this.transitionTo(
              t,
              function (t) {
                ;(r.stack = r.stack.slice(0, r.index).concat(t)), e && e(t)
              },
              n
            )
          }),
          (e.prototype.go = function (t) {
            var e = this,
              n = this.index + t
            if (!(n < 0 || n >= this.stack.length)) {
              var r = this.stack[n]
              this.confirmTransition(
                r,
                function () {
                  ;(e.index = n), e.updateRoute(r)
                },
                function (t) {
                  Tt(t, Ct.duplicated) && (e.index = n)
                }
              )
            }
          }),
          (e.prototype.getCurrentLocation = function () {
            var t = this.stack[this.stack.length - 1]
            return t ? t.fullPath : '/'
          }),
          (e.prototype.ensureURL = function () {}),
          e
        )
      })(Ut),
      Kt = function (t) {
        void 0 === t && (t = {}),
          (this.app = null),
          (this.apps = []),
          (this.options = t),
          (this.beforeHooks = []),
          (this.resolveHooks = []),
          (this.afterHooks = []),
          (this.matcher = rt(t.routes || [], this))
        var e = t.mode || 'hash'
        switch (
          ((this.fallback = 'history' === e && !Et && !1 !== t.fallback),
          this.fallback && (e = 'hash'),
          tt || (e = 'abstract'),
          (this.mode = e),
          e)
        ) {
          case 'history':
            this.history = new Nt(this, t.base)
            break
          case 'hash':
            this.history = new Bt(this, t.base, this.fallback)
            break
          case 'abstract':
            this.history = new Wt(this, t.base)
            break
          default:
            0
        }
      },
      Yt = { currentRoute: { configurable: !0 } }
    function Qt(t, e) {
      return (
        t.push(e),
        function () {
          var n = t.indexOf(e)
          n > -1 && t.splice(n, 1)
        }
      )
    }
    ;(Kt.prototype.match = function (t, e, n) {
      return this.matcher.match(t, e, n)
    }),
      (Yt.currentRoute.get = function () {
        return this.history && this.history.current
      }),
      (Kt.prototype.init = function (t) {
        var e = this
        if (
          (this.apps.push(t),
          t.$once('hook:destroyed', function () {
            var n = e.apps.indexOf(t)
            n > -1 && e.apps.splice(n, 1),
              e.app === t && (e.app = e.apps[0] || null),
              e.app || e.history.teardownListeners()
          }),
          !this.app)
        ) {
          this.app = t
          var n = this.history
          if (n instanceof Nt || n instanceof Bt) {
            var r = function (t) {
              n.setupListeners(),
                (function (t) {
                  var r = n.current,
                    o = e.options.scrollBehavior
                  Et && o && 'fullPath' in t && lt(e, t, r, !1)
                })(t)
            }
            n.transitionTo(n.getCurrentLocation(), r, r)
          }
          n.listen(function (t) {
            e.apps.forEach(function (e) {
              e._route = t
            })
          })
        }
      }),
      (Kt.prototype.beforeEach = function (t) {
        return Qt(this.beforeHooks, t)
      }),
      (Kt.prototype.beforeResolve = function (t) {
        return Qt(this.resolveHooks, t)
      }),
      (Kt.prototype.afterEach = function (t) {
        return Qt(this.afterHooks, t)
      }),
      (Kt.prototype.onReady = function (t, e) {
        this.history.onReady(t, e)
      }),
      (Kt.prototype.onError = function (t) {
        this.history.onError(t)
      }),
      (Kt.prototype.push = function (t, e, n) {
        var r = this
        if (!e && !n && 'undefined' != typeof Promise)
          return new Promise(function (e, n) {
            r.history.push(t, e, n)
          })
        this.history.push(t, e, n)
      }),
      (Kt.prototype.replace = function (t, e, n) {
        var r = this
        if (!e && !n && 'undefined' != typeof Promise)
          return new Promise(function (e, n) {
            r.history.replace(t, e, n)
          })
        this.history.replace(t, e, n)
      }),
      (Kt.prototype.go = function (t) {
        this.history.go(t)
      }),
      (Kt.prototype.back = function () {
        this.go(-1)
      }),
      (Kt.prototype.forward = function () {
        this.go(1)
      }),
      (Kt.prototype.getMatchedComponents = function (t) {
        var e = t ? (t.matched ? t : this.resolve(t).route) : this.currentRoute
        return e
          ? [].concat.apply(
              [],
              e.matched.map(function (t) {
                return Object.keys(t.components).map(function (e) {
                  return t.components[e]
                })
              })
            )
          : []
      }),
      (Kt.prototype.resolve = function (t, e, n) {
        var r = K(t, (e = e || this.history.current), n, this),
          o = this.match(r, e),
          i = o.redirectedFrom || o.fullPath
        return {
          location: r,
          route: o,
          href: (function (t, e, n) {
            var r = 'hash' === n ? '#' + e : e
            return t ? A(t + '/' + r) : r
          })(this.history.base, i, this.mode),
          normalizedTo: r,
          resolved: o,
        }
      }),
      (Kt.prototype.addRoutes = function (t) {
        this.matcher.addRoutes(t),
          this.history.current !== R &&
            this.history.transitionTo(this.history.getCurrentLocation())
      }),
      Object.defineProperties(Kt.prototype, Yt),
      (Kt.install = function t(e) {
        if (!t.installed || Y !== e) {
          ;(t.installed = !0), (Y = e)
          var n = function (t) {
              return void 0 !== t
            },
            r = function (t, e) {
              var r = t.$options._parentVnode
              n(r) &&
                n((r = r.data)) &&
                n((r = r.registerRouteInstance)) &&
                r(t, e)
            }
          e.mixin({
            beforeCreate: function () {
              n(this.$options.router)
                ? ((this._routerRoot = this),
                  (this._router = this.$options.router),
                  this._router.init(this),
                  e.util.defineReactive(
                    this,
                    '_route',
                    this._router.history.current
                  ))
                : (this._routerRoot =
                    (this.$parent && this.$parent._routerRoot) || this),
                r(this, this)
            },
            destroyed: function () {
              r(this)
            },
          }),
            Object.defineProperty(e.prototype, '$router', {
              get: function () {
                return this._routerRoot._router
              },
            }),
            Object.defineProperty(e.prototype, '$route', {
              get: function () {
                return this._routerRoot._route
              },
            }),
            e.component('RouterView', p),
            e.component('RouterLink', G)
          var o = e.config.optionMergeStrategies
          o.beforeRouteEnter =
            o.beforeRouteLeave =
            o.beforeRouteUpdate =
              o.created
        }
      }),
      (Kt.version = '3.4.1'),
      (Kt.isNavigationFailure = Tt),
      (Kt.NavigationFailureType = Ct),
      tt && window.Vue && window.Vue.use(Kt)
    var Gt = Kt,
      Zt = function () {
        return (0, this._self._c)('div', [this._v('home')])
      }
    Zt._withStripped = !0
    var te = c({ name: 'home' }, Zt, [], !1, null, null, null).exports,
      ee = function () {
        var t = this._self._c
        return t('div', [this._v('\n  aboute\n  '), t('child')], 1)
      }
    ee._withStripped = !0
    var ne = function () {
      return (0, this._self._c)('div', [this._v('about-child')])
    }
    ne._withStripped = !0
    var re = c(
        {
          created: function () {
            ;(a = null), a.length
          },
        },
        ne,
        [],
        !1,
        null,
        null,
        null
      ),
      oe = c(
        { name: 'about', components: { Child: re.exports } },
        ee,
        [],
        !1,
        null,
        null,
        null
      ).exports
    o.a.use(Gt)
    var ie = new Gt({
        routes: [
          { path: '/home', component: te },
          { path: '/about', component: oe },
          { path: '/', redirect: '/home' },
        ],
      }),
      ae = n(2)
    new (n.n(ae).a)({
      url: 'http://localhost:8080/api/collect/info/detail',
      project: 'testvue',
      version: '1.0.2',
      isVue: !0,
      vue: o.a,
      isCollectPer: !1,
    }),
      new o.a({
        el: '#app',
        router: ie,
        render: function (t) {
          return t(u)
        },
      })
  },
])
//# sourceMappingURL=main.ec314ab9cd719f2de58c.js.map
