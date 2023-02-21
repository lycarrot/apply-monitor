var defaultOptions = {
    isVue: false,
    sendWay: 'img',
};

var MonitorType;
(function (MonitorType) {
    MonitorType["ERROR"] = "error";
    MonitorType["PERFORMANCE"] = "performance";
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

var PerformanceType;
(function (PerformanceType) {
    PerformanceType["first-paint"] = "FP";
    PerformanceType["first-contentful-paint"] = "FCP";
    PerformanceType["largest-contentful-paint"] = "LCP";
    PerformanceType["layout-shift"] = "CLS";
    PerformanceType["first-input"] = "FID";
    PerformanceType["nav-connecttion"] = "NC";
    PerformanceType["navigation"] = "Navigation";
    PerformanceType["memory"] = "Memory";
})(PerformanceType || (PerformanceType = {}));

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
var switchToMB = function (bytes) {
    if (typeof bytes !== 'number') {
        return null;
    }
    return parseFloat((bytes / Math.pow(1024, 2)).toFixed(2));
};
var isIncludeEle = function (node, arr) {
    if (!node || node === document.documentElement) {
        return false;
    }
    if (arr.includes(node)) {
        return true;
    }
    return isIncludeEle(node.parentElement, arr);
};

var isPerformance = function () {
    return (!!window.performance &&
        !!window.performance.getEntriesByType &&
        !!window.performance.mark);
};
var isPerformanceObserver = function () {
    return !!window.PerformanceObserver;
};
var isNavigator = function () {
    return !!window.navigator;
};

// 页面加载完成
var onLoaded = function (callback) {
    if (document.readyState === 'complete') {
        setTimeout(callback);
    }
    else {
        addEventListener('pageshow', callback);
    }
};
// 页面隐藏
function onHidden(callback, once) {
    var onHiddenOrPageHide = function (event) {
        if (event.type === 'pagehide' || document.visibilityState === 'hidden') {
            callback(event);
            if (once) {
                window.removeEventListener('visibilitychange', onHiddenOrPageHide, true);
                window.removeEventListener('pagehide', onHiddenOrPageHide, true);
            }
        }
    };
    window.addEventListener('visibilitychange', onHiddenOrPageHide, true);
    window.addEventListener('pagehide', onHiddenOrPageHide, true);
}
// 页面卸载（关闭）或刷新时调用
var beforeUnload = function (callback) {
    window.addEventListener('beforeunload', callback);
};

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
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        };
        this.queue.push(fn);
    };
    return ReportInfo;
}());

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
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

var Store = /** @class */ (function () {
    function Store() {
        this.store = new Map();
    }
    Store.prototype.get = function (key) {
        return this.store.get(key);
    };
    Store.prototype.set = function (key, val) {
        this.store.set(key, val);
    };
    Store.prototype.clear = function () {
        this.store.clear();
    };
    Store.prototype.getValues = function () {
        return Array.from(this.store).reduce(function (obj, _a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            obj[key] = value;
            return obj;
        }, {});
    };
    return Store;
}());

function observe(type, handler) {
    if (PerformanceObserver.supportedEntryTypes.includes(type)) {
        var ob = new PerformanceObserver(function (item) {
            return item.getEntries().map(handler);
        });
        ob.observe({ type: type, buffered: true });
        return ob;
    }
}

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

function setPerformanceData$3(store, entry) {
    if (entry.name) {
        var data = {
            type: MonitorType.PERFORMANCE,
            secondType: PerformanceType[entry.name],
            time: getNowTime(),
            value: entry.startTime.toFixed(2),
        };
        store.set(PerformanceType[entry.name], data);
    }
}
function getEntriesByFP(store) {
    var FP = performance.getEntriesByName('first-paint')[0];
    var FCP = performance.getEntriesByName('first-contentful-paint')[0];
    setPerformanceData$3(store, FP);
    setPerformanceData$3(store, FCP);
}
function getFP(store) {
    if (!isPerformanceObserver()) {
        if (!isPerformance()) {
            throw new Error('浏览器不支持performance');
        }
        else {
            onLoaded(function () {
                getEntriesByFP(store);
            });
        }
    }
    else {
        var entryHandler = function (entry) {
            if (ob_1) {
                ob_1.disconnect();
            }
            setPerformanceData$3(store, entry);
        };
        // first-paint first-contentful-paint
        var ob_1 = observe('paint', entryHandler);
    }
}

function setPerformanceData$2(store, entry) {
    if (entry.entryType) {
        var data = {
            type: MonitorType.PERFORMANCE,
            secondType: PerformanceType[entry.entryType],
            time: getNowTime(),
            value: entry.startTime.toFixed(2),
        };
        store.set(PerformanceType[entry.entryType], data);
    }
}
function getLCP(store) {
    if (!isPerformanceObserver()) {
        throw new Error('浏览器不支持PerformanceObserver');
    }
    else {
        var entryHandler = function (entry) {
            if (ob_1) {
                ob_1.disconnect();
            }
            setPerformanceData$2(store, entry);
        };
        // largest-contentful-paint
        var ob_1 = observe('largest-contentful-paint', entryHandler);
    }
}

var value = 0;
var typeName = 'layout-shift';
function getCLS(store) {
    if (!isPerformanceObserver()) {
        throw new Error('浏览器不支持PerformanceObserver');
    }
    else {
        var entryHandler = function (entry) {
            if (!entry.hadRecentInput) {
                value += entry.value;
            }
        };
        var ob_1 = observe(typeName, entryHandler);
        var stopListening = function () {
            if (ob_1 === null || ob_1 === void 0 ? void 0 : ob_1.takeRecords) {
                ob_1.takeRecords().map(function (entry) {
                    if (!entry.hadRecentInput) {
                        value += entry.value;
                    }
                });
            }
            ob_1 === null || ob_1 === void 0 ? void 0 : ob_1.disconnect();
            var data = {
                type: MonitorType.PERFORMANCE,
                secondType: PerformanceType[typeName],
                time: getNowTime(),
                value: value.toFixed(2),
            };
            store.set(PerformanceType[typeName], data);
        };
        onHidden(stopListening, true);
    }
}

function setPerformanceData$1(store, entry) {
    if (entry.entryType) {
        var data = {
            type: MonitorType.PERFORMANCE,
            secondType: PerformanceType[entry.entryType],
            time: getNowTime(),
            value: entry.startTime.toFixed(2),
            event: entry.name,
        };
        store.set(PerformanceType[entry.entryType], data);
    }
}
function getFID(store) {
    if (!isPerformanceObserver()) {
        throw new Error('浏览器不支持PerformanceObserver');
    }
    else {
        var entryHandler = function (entry) {
            if (ob_1) {
                ob_1.disconnect();
            }
            setPerformanceData$1(store, entry);
        };
        var ob_1 = observe('first-input', entryHandler);
    }
}

function getFSP(store) {
    if (!MutationObserver) {
        throw new Error('浏览器不支持MutationObserver');
    }
    var next = window.requestAnimationFrame
        ? requestAnimationFrame
        : setTimeout;
    var ignoreDOMList = ['STYLE', 'SCRIPT', 'LINK', 'META'];
    var ob = new MutationObserver(function (mutationList) {
        var e_1, _a, e_2, _b;
        next(function () {
            entry.startTime = performance.now();
        });
        var entry = {
            startTime: 0,
            children: [],
        };
        try {
            for (var mutationList_1 = __values(mutationList), mutationList_1_1 = mutationList_1.next(); !mutationList_1_1.done; mutationList_1_1 = mutationList_1.next()) {
                var mutation = mutationList_1_1.value;
                if (mutation.addedNodes.length) {
                    var nodeLists = Array.from(mutation.addedNodes);
                    try {
                        for (var nodeLists_1 = (e_2 = void 0, __values(nodeLists)), nodeLists_1_1 = nodeLists_1.next(); !nodeLists_1_1.done; nodeLists_1_1 = nodeLists_1.next()) {
                            var node = nodeLists_1_1.value;
                            if (node.nodeType === 1 &&
                                !ignoreDOMList.includes(node === null || node === void 0 ? void 0 : node.tagName) &&
                                !isIncludeEle(node, entry.children)) {
                                entry.children.push(node);
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (nodeLists_1_1 && !nodeLists_1_1.done && (_b = nodeLists_1.return)) _b.call(nodeLists_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (mutationList_1_1 && !mutationList_1_1.done && (_a = mutationList_1.return)) _a.call(mutationList_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (entry.children.length) ;
    });
    ob.observe(document, {
        childList: true,
        subtree: true,
    });
}

var entryType = 'navigation';
function setPerformanceData(store, entry) {
    var domainLookupStart = entry.domainLookupStart, domainLookupEnd = entry.domainLookupEnd, connectStart = entry.connectStart, connectEnd = entry.connectEnd, secureConnectionStart = entry.secureConnectionStart, requestStart = entry.requestStart, responseStart = entry.responseStart, responseEnd = entry.responseEnd, domInteractive = entry.domInteractive, domContentLoadedEventStart = entry.domContentLoadedEventStart, domContentLoadedEventEnd = entry.domContentLoadedEventEnd, loadEventStart = entry.loadEventStart, fetchStart = entry.fetchStart;
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
        deferExecuteDuration: (domContentLoadedEventStart - domInteractive).toFixed(2),
        // 脚本加载时间
        domContentLoadedCallback: (domContentLoadedEventEnd - domContentLoadedEventStart).toFixed(2),
        // onload事件时间
        resourceLoad: (loadEventStart - domContentLoadedEventEnd).toFixed(2),
        // DOM阶段渲染耗时
        domReady: (domContentLoadedEventEnd - fetchStart).toFixed(2),
    };
    var data = {
        type: MonitorType.PERFORMANCE,
        secondType: PerformanceType[entryType],
        time: getNowTime(),
        value: timing,
    };
    store.set(PerformanceType[entryType], data);
}
function getPerformanceentryTim() {
    var entryTim = (performance.getEntriesByType('navigation').length > 0
        ? performance.getEntriesByType('navigation')[0]
        : performance.timing);
    return entryTim;
}
function getNavTiming(store) {
    if (!isPerformanceObserver()) {
        if (!isPerformance()) {
            throw new Error('浏览器不支持performance');
        }
        else {
            onLoaded(function () {
                setPerformanceData(store, getPerformanceentryTim());
            });
        }
    }
    else {
        var entryHandler = function (entry) {
            if (ob_1) {
                ob_1.disconnect();
            }
            setPerformanceData(store, entry);
        };
        var ob_1 = observe(entryType, entryHandler);
    }
}

var type = 'memory';
function getMemory(store) {
    if (!isPerformance()) {
        throw new Error('浏览器不支持Performance');
    }
    if (!isNavigator()) {
        throw new Error('浏览器不支持Navigator');
    }
    var value = {
        deviceMemory: 'deviceMemory' in navigator ? navigator['deviceMemory'] : 0,
        hardwareConcurrency: 'hardwareConcurrency' in navigator ? navigator['hardwareConcurrency'] : 0,
        //   内存大小限制
        jsHeapSizeLimit: 'memory' in performance
            ? switchToMB(performance['memory']['jsHeapSizeLimit'])
            : 0,
        // 可使用的内存大小
        totalJSHeapSize: 'memory' in performance
            ? switchToMB(performance['memory']['totalJSHeapSize'])
            : 0,
        //   JS 对象占用的内存数
        usedJSHeapSize: 'memory' in performance
            ? switchToMB(performance['memory']['usedJSHeapSize'])
            : 0,
    };
    var data = {
        type: MonitorType.PERFORMANCE,
        secondType: PerformanceType[type],
        time: getNowTime(),
        value: value,
    };
    console.log('value', value);
    store.set(PerformanceType[type], data);
}

function getNavConnection(store) {
    if (!isNavigator()) {
        throw new Error('浏览器不支持Navigator');
    }
    else {
        var connection = ('connection' in navigator ? navigator['connection'] : {});
        var data = {
            type: MonitorType.PERFORMANCE,
            secondType: PerformanceType['nav-connecttion'],
            time: getNowTime(),
            value: {
                downlink: connection.downlink,
                effectiveType: connection.effectiveType,
                rtt: connection.rtt,
            },
        };
        store.set(PerformanceType['nav-connecttion'], data);
    }
}

var Performance = /** @class */ (function () {
    function Performance(options) {
        this.newStore = new Store();
        this.reportInfo = new ReportInfo(options);
        this.init();
    }
    Performance.prototype.init = function () {
        getFP(this.newStore);
        getLCP(this.newStore);
        getCLS(this.newStore);
        getFID(this.newStore);
        getNavConnection(this.newStore);
        getNavTiming(this.newStore);
        getFSP(this.newStore);
        getMemory(this.newStore);
        this.report();
    };
    Performance.prototype.report = function () {
        var _this = this;
        [onLoaded, onHidden, beforeUnload].forEach(function (event) {
            event(function () {
                var storeData = _this.newStore.getValues();
                Object.keys(storeData).forEach(function (key) {
                    _this.reportInfo.send(storeData[key]);
                });
                _this.newStore.clear();
            });
        });
    };
    return Performance;
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
        new Performance(options);
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

export { Monitor as default };
