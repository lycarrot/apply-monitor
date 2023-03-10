'use strict';

var defaultOptions = {
    isVue: false,
    sendWay: 'img',
};

var MonitorType;
(function (MonitorType) {
    MonitorType["ERROR"] = "error";
    MonitorType["PERFORMANCE"] = "performance";
    MonitorType["BEHAVIOR"] = "behavior";
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
    PerformanceType["FP"] = "first-paint";
    PerformanceType["FCP"] = "first-contentful-paint";
    PerformanceType["LCP"] = "largest-contentful-paint";
    PerformanceType["CLS"] = "layout-shift";
    PerformanceType["FID"] = "first-input";
    PerformanceType["FSP"] = "first-screen-paint";
    PerformanceType["NC"] = "nav-connecttion";
    PerformanceType["NAV"] = "navigation";
    PerformanceType["MRY"] = "memory";
    PerformanceType["DICE"] = "devices";
})(PerformanceType || (PerformanceType = {}));

var BehaviorType;
(function (BehaviorType) {
    BehaviorType["PV"] = "pv";
    BehaviorType["VJ"] = "vue-jump";
    BehaviorType["PD"] = "page-duration";
})(BehaviorType || (BehaviorType = {}));

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
// dom ????????????????????????
var isInScreen = function (dom) {
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;
    var rectInfo = dom.getBoundingClientRect();
    if (rectInfo.left >= 0 &&
        rectInfo.left < viewportWidth &&
        rectInfo.top >= 0 &&
        rectInfo.top < viewportHeight) {
        return true;
    }
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

// ??????????????????
var onLoaded = function (callback) {
    if (document.readyState === 'complete') {
        setTimeout(callback);
    }
    else {
        addEventListener('pageshow', callback);
    }
};
// ????????????
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
// ??????????????????????????????????????????
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
        this.sendWay = options.sendWay;
        this.queue = new Queue();
    }
    ReportInfo.prototype.send = function (data) {
        this.sendWay == 'img' ? this.useImg(data) : this.useAjax(data);
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

var Error$1 = /** @class */ (function () {
    function Error(options) {
        this.init(options);
        this.reportInfo = new ReportInfo(options);
    }
    Error.prototype.init = function (options) {
        this.handleJS();
        if (options.isVue) {
            this.handleVue(options.vue);
        }
        if (options.sendWay == 'ajax') {
            this.handleAajxError();
        }
    };
    Error.prototype.report = function (secondType, value) {
        this.reportInfo.send({
            type: MonitorType.ERROR,
            secondType: secondType,
            level: Level.ERROR,
            time: getNowTime(),
            value: value,
        });
    };
    // js????????????
    Error.prototype.handleJS = function () {
        var _this = this;
        window.addEventListener('error', function (event) {
            var target = event.target;
            if (target && (target.src || target.href)) {
                _this.report(ErrorType.JS, {
                    message: '?????????????????????',
                    filename: target.src || target.href,
                    tagName: target.tagName,
                });
            }
            else {
                var message = event.message, filename = event.filename, lineno = event.lineno, colno = event.colno;
                _this.report(ErrorType.JS, {
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
            _this.report(ErrorType.PROMISE, {
                message: message,
                filename: filename,
                position: "".concat(line, ":").concat(column),
                stack: stack,
            });
        }, true);
    };
    // vue????????????;
    Error.prototype.handleVue = function (Vue) {
        var _this = this;
        Vue.config.errorHandler = function (error, vm, info) {
            var componentName;
            if (Object.prototype.toString.call(vm) === '[object Object]') {
                componentName = vm._isVue
                    ? vm.$options.name || vm.$options._componentTag
                    : vm.name;
            }
            _this.report(ErrorType.VUE, {
                message: error.message,
                info: info,
                componentName: componentName,
                stack: error.stack,
            });
        };
    };
    //ajax????????????
    Error.prototype.handleAajxError = function () {
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
                    _this.report(ErrorType.AJAX, {
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
    return Error;
}());

// first-paint  ??????????????????????????????????????????????????????????????????
//  first-contentful-paint ????????????????????????????????????????????????????????????????????????????????????
function getEntriesByFP(setStore) {
    var entryFP = performance.getEntriesByName('first-paint')[0];
    var entryFCP = performance.getEntriesByName('first-contentful-paint')[0];
    setStore(PerformanceType.FP, entryFP.startTime.toFixed(2));
    setStore(PerformanceType.FCP, entryFCP.startTime.toFixed(2));
}
function getFP(setStore) {
    if (!isPerformanceObserver()) {
        if (!isPerformance()) {
            throw new Error('??????????????????performance');
        }
        else {
            onLoaded(function () {
                getEntriesByFP(setStore);
            });
        }
    }
    else {
        var entryHandler = function (entry) {
            if (ob_1) {
                ob_1.disconnect();
            }
            setStore(PerformanceType.FP, entry.startTime.toFixed(2));
        };
        var ob_1 = observe('paint', entryHandler);
    }
}

// largest-contentful-paint ???????????????????????????????????????????????????????????????????????????????????????
var lcpDone = false;
function isLCPDone() {
    return lcpDone;
}
function getLCP(setStore) {
    if (!isPerformanceObserver()) {
        lcpDone = true;
        throw new Error('??????????????????PerformanceObserver');
    }
    else {
        var entryHandler = function (entry) {
            lcpDone = true;
            if (ob_1) {
                ob_1.disconnect();
            }
            setStore(PerformanceType.LCP, entry.startTime.toFixed(2));
        };
        var ob_1 = observe('largest-contentful-paint', entryHandler);
    }
}

// layout-shift ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
var value = 0;
function getCLS(setStore) {
    if (!isPerformanceObserver()) {
        throw new Error('??????????????????PerformanceObserver');
    }
    else {
        var entryHandler = function (entry) {
            if (!entry.hadRecentInput) {
                value += entry.value;
            }
        };
        var ob_1 = observe(PerformanceType.CLS, entryHandler);
        var stopListening = function () {
            if (ob_1 === null || ob_1 === void 0 ? void 0 : ob_1.takeRecords) {
                ob_1.takeRecords().map(function (entry) {
                    if (!entry.hadRecentInput) {
                        value += entry.value;
                    }
                });
            }
            ob_1 === null || ob_1 === void 0 ? void 0 : ob_1.disconnect();
            setStore(PerformanceType.CLS, value.toFixed(2));
        };
        onHidden(stopListening, true);
    }
}

// first-input ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????JavaScript????????????????????????????????????????????????????????????????????????
function getFID(setStore) {
    if (!isPerformanceObserver()) {
        throw new Error('??????????????????PerformanceObserver');
    }
    else {
        var entryHandler = function (entry) {
            if (ob_1) {
                ob_1.disconnect();
            }
            setStore(PerformanceType.FID, {
                value: entry.startTime.toFixed(2),
                event: entry.name,
            });
        };
        var ob_1 = observe(PerformanceType.FID, entryHandler);
    }
}

//first-screen-paint ??????????????????
var entries = [];
var isOnLoaded = false;
onLoaded(function () {
    isOnLoaded = true;
});
var timer;
function checkDOMChange(setStore) {
    clearTimeout(timer);
    timer = setTimeout(function () {
        // ??? load???lcp ????????????????????? DOM ?????????????????????????????????????????????
        if (isOnLoaded && isLCPDone()) {
            setStore(PerformanceType.FSP, getRenderTime());
            entries = null;
        }
        else {
            checkDOMChange(setStore);
        }
    }, 500);
}
function getRenderTime() {
    var startTime = 0;
    entries.forEach(function (entry) {
        var e_1, _a;
        try {
            for (var _b = __values(entry.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var node = _c.value;
                if (isInScreen(node) &&
                    entry.startTime > startTime &&
                    needToCalculate(node)) {
                    startTime = entry.startTime;
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
    // ????????????????????????????????????????????????????????????????????????
    // ??????????????????????????? startTime?????????????????????????????? startTime
    performance.getEntriesByType('resource').forEach(function (item) {
        if (item.initiatorType === 'img' &&
            item.fetchStart < startTime &&
            item.responseEnd > startTime) {
            startTime = item.responseEnd;
        }
    });
    return startTime;
}
function needToCalculate(node) {
    // ???????????????????????????
    if (window.getComputedStyle(node).display === 'none')
        return false;
    // ?????????????????????????????????
    if (node.tagName === 'IMG' && node.width < 2 && node.height < 2) {
        return false;
    }
    return true;
}
function getFSP(setStore) {
    if (!MutationObserver) {
        throw new Error('??????????????????MutationObserver');
    }
    var next = window.requestAnimationFrame
        ? requestAnimationFrame
        : setTimeout;
    var ignoreDOMList = ['STYLE', 'SCRIPT', 'LINK', 'META'];
    var ob = new MutationObserver(function (mutationList) {
        var e_2, _a, e_3, _b;
        checkDOMChange(setStore);
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
                        for (var nodeLists_1 = (e_3 = void 0, __values(nodeLists)), nodeLists_1_1 = nodeLists_1.next(); !nodeLists_1_1.done; nodeLists_1_1 = nodeLists_1.next()) {
                            var node = nodeLists_1_1.value;
                            if (node.nodeType === 1 &&
                                !ignoreDOMList.includes(node === null || node === void 0 ? void 0 : node.tagName) &&
                                !isIncludeEle(node, entry.children)) {
                                entry.children.push(node);
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (nodeLists_1_1 && !nodeLists_1_1.done && (_b = nodeLists_1.return)) _b.call(nodeLists_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (mutationList_1_1 && !mutationList_1_1.done && (_a = mutationList_1.return)) _a.call(mutationList_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (entry.children.length) {
            entries.push(entry);
        }
    });
    ob.observe(document, {
        childList: true,
        subtree: true,
    });
}

// navigation ?????????????????????????????????????????????????????????????????????
function setPerformanceData(setStore, entry) {
    var domainLookupStart = entry.domainLookupStart, domainLookupEnd = entry.domainLookupEnd, connectStart = entry.connectStart, connectEnd = entry.connectEnd, secureConnectionStart = entry.secureConnectionStart, requestStart = entry.requestStart, responseStart = entry.responseStart, responseEnd = entry.responseEnd, domInteractive = entry.domInteractive, domContentLoadedEventStart = entry.domContentLoadedEventStart, domContentLoadedEventEnd = entry.domContentLoadedEventEnd, loadEventStart = entry.loadEventStart, fetchStart = entry.fetchStart;
    var timing = {
        // DNS????????????
        dnsLookup: (domainLookupEnd - domainLookupStart).toFixed(2),
        // TCP??????????????????
        initialConnection: (connectEnd - connectStart).toFixed(2),
        // ssl????????????
        ssl: secureConnectionStart
            ? (connectEnd - secureConnectionStart).toFixed(2)
            : 0,
        // HTTP????????????????????????
        ttfb: (responseStart - requestStart).toFixed(2),
        // ????????????????????????????????????
        contentDownload: (responseEnd - responseStart).toFixed(2),
        // dom????????????
        domParse: (domInteractive - responseEnd).toFixed(2),
        // DOM ??????????????????
        deferExecuteDuration: (domContentLoadedEventStart - domInteractive).toFixed(2),
        // ??????????????????
        domContentLoadedCallback: (domContentLoadedEventEnd - domContentLoadedEventStart).toFixed(2),
        // onload????????????
        resourceLoad: (loadEventStart - domContentLoadedEventEnd).toFixed(2),
        // DOM??????????????????
        domReady: (domContentLoadedEventEnd - fetchStart).toFixed(2),
    };
    setStore(PerformanceType.NAV, timing);
}
function getPerformanceentryTim() {
    var entryTim = (performance.getEntriesByType('navigation').length > 0
        ? performance.getEntriesByType('navigation')[0]
        : performance.timing);
    return entryTim;
}
function getNavTiming(setStore) {
    if (!isPerformanceObserver()) {
        if (!isPerformance()) {
            throw new Error('??????????????????performance');
        }
        else {
            onLoaded(function () {
                setPerformanceData(setStore, getPerformanceentryTim());
            });
        }
    }
    else {
        var entryHandler = function (entry) {
            if (ob_1) {
                ob_1.disconnect();
            }
            setPerformanceData(setStore, entry);
        };
        var ob_1 = observe(PerformanceType.NAV, entryHandler);
    }
}

// ????????????????????????
function getMemory(setStore) {
    if (!isPerformance()) {
        throw new Error('??????????????????Performance');
    }
    if (!isNavigator()) {
        throw new Error('??????????????????Navigator');
    }
    var value = {
        deviceMemory: 'deviceMemory' in navigator ? navigator['deviceMemory'] : 0,
        hardwareConcurrency: 'hardwareConcurrency' in navigator ? navigator['hardwareConcurrency'] : 0,
        //   ??????????????????
        jsHeapSizeLimit: 'memory' in performance
            ? switchToMB(performance['memory']['jsHeapSizeLimit'])
            : 0,
        // ????????????????????????
        totalJSHeapSize: 'memory' in performance
            ? switchToMB(performance['memory']['totalJSHeapSize'])
            : 0,
        //   JS ????????????????????????
        usedJSHeapSize: 'memory' in performance
            ? switchToMB(performance['memory']['usedJSHeapSize'])
            : 0,
    };
    setStore(PerformanceType.MRY, value);
}

// ????????????????????????
function getNavConnection(setStore) {
    if (!isNavigator()) {
        throw new Error('??????????????????Navigator');
    }
    else {
        var connection = 'connection' in navigator ? navigator['connection'] : {};
        var value = {
            downlink: connection.downlink,
            effectiveType: connection.effectiveType,
            rtt: connection.rtt,
        };
        setStore(PerformanceType.NC, value);
    }
}

function getDevices(setStore) {
    if (!window.location) {
        throw new Error('??????????????????location');
    }
    var host = location.host, hostname = location.hostname, href = location.href, protocol = location.protocol, origin = location.origin, port = location.port, pathname = location.pathname, search = location.search, hash = location.hash;
    var _a = window.screen, width = _a.width, height = _a.height;
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
        screenResolution: "".concat(width, "*").concat(height),
    };
    setStore(PerformanceType.DICE, info);
}

var Performance = /** @class */ (function () {
    function Performance(options) {
        this.newStore = new Store();
        this.reportInfo = new ReportInfo(options);
        this.init();
    }
    Performance.prototype.init = function () {
        getFP(this.setStore);
        getLCP(this.setStore);
        getCLS(this.setStore);
        getFID(this.setStore);
        getNavConnection(this.setStore);
        getNavTiming(this.setStore);
        getFSP(this.setStore);
        getMemory(this.setStore);
        getDevices(this.setStore);
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
    Performance.prototype.setStore = function (secondType, value) {
        var data = {
            type: MonitorType.PERFORMANCE,
            secondType: secondType,
            level: Level.INFO,
            time: getNowTime(),
            value: value,
        };
        this.newStore.set(secondType, data);
    };
    return Performance;
}());

var Monitor = /** @class */ (function () {
    function Monitor(options) {
        this.init(options);
    }
    Monitor.prototype.init = function (options) {
        if (!options.url) {
            console.error('url??????');
            return;
        }
        if (!options.apiKey) {
            console.error('apiKey??????');
            return;
        }
        if (options.isVue && !options.vue) {
            console.log('??????isVue???true???,??????vue???????????????Vue');
            return;
        }
        this.setDefault(options);
        new Error$1(options);
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

module.exports = Monitor;
