(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["@apply-monitor/monitor"] = factory());
})(this, (function () { 'use strict';

    var defaultOptions = {
        isVue: false,
        sendWay: 'img',
    };

    var MonitorType;
    (function (MonitorType) {
        MonitorType["ERROR"] = "error";
    })(MonitorType || (MonitorType = {}));
    var Level;
    (function (Level) {
        Level["ERROR"] = "error";
        Level["WARN"] = "warn";
        Level["INFO"] = "info";
    })(Level || (Level = {}));

    var ErrorType;
    (function (ErrorType) {
        ErrorType["JS"] = "js_error";
        ErrorType["RESOURCE"] = "resource_error";
        ErrorType["VUE"] = "vue_error";
        ErrorType["PROMISE"] = "promise_error";
        ErrorType["AJAX"] = "ajax_error";
    })(ErrorType || (ErrorType = {}));

    function formatParams(obj) {
        var strArr = [];
        Object.keys(obj).forEach(function (key) {
            strArr.push("".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(obj[key])));
        });
        return strArr.join('&');
    }
    function getLines(stack) {
        return stack
            .split('\n')
            .slice(1)
            .map(function (item) { return item.replace(/^\s+at\s+/g, ''); })
            .join('^');
    }
    function getNowTime() {
        return Date.now();
    }

    var Queue = /** @class */ (function () {
        function Queue() {
            this.pending = false;
            this.callbacks = [];
        }
        Queue.prototype.push = function (fn) {
            var _this = this;
            if (typeof fn !== 'function')
                return;
            this.callbacks.push(fn);
            if (!this.pending) {
                this.pending = true;
                Promise.resolve().then(function () {
                    _this.flushCallbacks();
                });
            }
        };
        Queue.prototype.flushCallbacks = function () {
            this.pending = false;
            var copies = this.callbacks.slice();
            this.callbacks.length = 0;
            for (var i = 0; i < copies.length; i++) {
                copies[i]();
            }
        };
        Queue.prototype.getCallbacks = function () {
            return this.callbacks;
        };
        Queue.prototype.clear = function () {
            this.callbacks = [];
        };
        return Queue;
    }());

    var ReportInfo = /** @class */ (function () {
        function ReportInfo(options) {
            this.url = options.url;
            this.senday = options.sendWay;
            this.queue = new Queue();
        }
        ReportInfo.prototype.send = function (data) {
            this.senday == 'img' ? this.useImg(data) : this.useAjax(data);
        };
        ReportInfo.prototype.useImg = function (data) {
            var _this = this;
            var fn = function () {
                var img = new Image();
                var spliceStr = _this.url.indexOf('?') === -1 ? '?' : '&';
                img.src = "".concat(_this.url).concat(spliceStr).concat(formatParams(data));
                img = null;
            };
            this.queue.push(fn);
        };
        ReportInfo.prototype.useAjax = function (data) {
            var _this = this;
            var fn = function () {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', _this.url);
                xhr.withCredentials;
                xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
                xhr.send(JSON.stringify(data));
            };
            this.queue.push(fn);
        };
        return ReportInfo;
    }());

    var InitError = /** @class */ (function () {
        function InitError(options) {
            this.init(options);
            this.reportInfo = new ReportInfo(options);
        }
        InitError.prototype.init = function (options) {
            this.handleJS();
            if (options.isVue) {
                this.handleVue(options.vue);
            }
            if (options.sendWay == 'ajax') {
                this.handleAajxError();
            }
        };
        // js错误监控
        InitError.prototype.handleJS = function () {
            var _this = this;
            window.addEventListener('error', function (event) {
                var target = event.target;
                if (target && (target.src || target.href)) {
                    _this.reportInfo.send({
                        type: MonitorType.ERROR,
                        secondType: ErrorType.JS,
                        level: Level.ERROR,
                        time: getNowTime(),
                        message: '资源加载异常了',
                        filename: target.src || target.href,
                        tagName: target.tagName,
                    });
                }
                else {
                    var message = event.message, filename = event.filename, lineno = event.lineno, colno = event.colno;
                    _this.reportInfo.send({
                        type: MonitorType.ERROR,
                        secondType: ErrorType.JS,
                        level: Level.ERROR,
                        time: getNowTime(),
                        message: message,
                        filename: filename,
                        position: "".concat(lineno, ":").concat(colno),
                        stack: getLines(event.error.stack),
                    });
                }
            }, true);
            window.addEventListener('unhandledrejection', function (event) {
                var message;
                var filename;
                var line = 0;
                var column = 0;
                var stack = '';
                var reason = event.reason;
                debugger;
                if (typeof reason === 'string') {
                    message = reason;
                }
                else if (typeof reason === 'object') {
                    message = reason.message;
                    if (reason.stack) {
                        var matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
                        filename = matchResult[1];
                        line = matchResult[2];
                        column = matchResult[3];
                    }
                    stack = getLines(reason.stack);
                }
                _this.reportInfo.send({
                    type: MonitorType.ERROR,
                    secondType: ErrorType.PROMISE,
                    level: Level.WARN,
                    time: getNowTime(),
                    message: message,
                    filename: filename,
                    position: "".concat(line, ":").concat(column),
                    stack: stack,
                });
            }, true);
        };
        //vue错误监控
        InitError.prototype.handleVue = function (Vue) {
            var _this = this;
            Vue.config.errorHandler = function (error, vm, info) {
                var componentName;
                if (Object.prototype.toString.call(vm) === '[object Object]') {
                    componentName = vm._isVue
                        ? vm.$options.name || vm.$options._componentTag
                        : vm.name;
                }
                _this.reportInfo.send({
                    type: MonitorType.ERROR,
                    secondType: ErrorType.VUE,
                    level: Level.ERROR,
                    time: getNowTime(),
                    message: error.message,
                    info: info,
                    componentName: componentName,
                    stack: error.stack,
                });
            };
        };
        //ajax请求错误
        InitError.prototype.handleAajxError = function () {
            var _this = this;
            if (!window.XMLHttpRequest) {
                return;
            }
            var xhrSend = XMLHttpRequest.prototype.send;
            XMLHttpRequest.prototype.send = function () {
                if (this.addEventListener) {
                    this.addEventListener('error', _handleEvent);
                    this.addEventListener('load', _handleEvent);
                    this.addEventListener('abort', _handleEvent);
                }
                else {
                    var tempStateChange_1 = this.onreadystatechange;
                    this.onreadystatechange = function (event) {
                        tempStateChange_1.apply(this, arguments);
                        if (this.readyState === 4) {
                            _handleEvent(event);
                        }
                    };
                }
                return xhrSend.apply(this, arguments);
            };
            var _handleEvent = function (event) {
                try {
                    if (!event)
                        return;
                    var target = event.currentTarget;
                    if (target && target.status !== 200) {
                        _this.reportInfo.send({
                            type: MonitorType.ERROR,
                            secondType: ErrorType.AJAX,
                            level: Level.ERROR,
                            time: getNowTime(),
                            message: target.response,
                            status: target.status,
                            statusText: target.statusText,
                            url: target.responseURL,
                        });
                    }
                }
                catch (error) {
                    console.log(error);
                }
            };
        };
        return InitError;
    }());

    var Monitor = /** @class */ (function () {
        function Monitor(options) {
            this.init(options);
        }
        Monitor.prototype.init = function (options) {
            if (!options.url) {
                console.error('url必传');
                return;
            }
            if (!options.apiKey) {
                console.error('apiKey必传');
                return;
            }
            if (options.isVue && !options.vue) {
                console.log('如果选择监控的是Vue程序,请在vue字段上传入Vue');
                return;
            }
            this.setDefault(options);
            new InitError(options);
        };
        Monitor.prototype.setDefault = function (options) {
            Object.keys(defaultOptions).forEach(function (key) {
                if (!options[key]) {
                    options[key] = defaultOptions[key];
                }
            });
        };
        return Monitor;
    }());

    return Monitor;

}));
