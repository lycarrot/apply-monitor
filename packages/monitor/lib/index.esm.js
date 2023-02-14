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
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

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

var ReportInfo = /** @class */ (function () {
    function ReportInfo(url) {
        this.url = url;
        this.data = {};
    }
    ReportInfo.prototype.send = function (data) {
        this.useImg(data);
    };
    ReportInfo.prototype.useImg = function (data) {
        // const fn = () => {
        var img = new Image();
        var spliceStr = this.url.indexOf('?') === -1 ? '?' : '&';
        img.src = "".concat(this.url).concat(spliceStr).concat(formatParams(data));
        img = null;
        // };
        // this.queue.addFn(requestFun);
    };
    return ReportInfo;
}());

var InitError = /** @class */ (function (_super) {
    __extends(InitError, _super);
    function InitError(options) {
        var _this = _super.call(this, options.url) || this;
        _this.init(options);
        return _this;
    }
    InitError.prototype.init = function (options) {
        this.handleJS();
    };
    InitError.prototype.handleJS = function () {
        var _this = this;
        window.addEventListener('error', function (event) {
            var target = event.target;
            if (target && (target.src || target.href)) {
                _this.send({
                    type: 'error',
                    secondType: 'resourceError',
                    filename: event.target.src || event.target.href,
                    tagName: event.target.tagName,
                });
            }
            else {
                _this.send({
                    type: 'error',
                    secondType: 'jsError',
                    filename: event.filename,
                    message: event.message,
                    position: "".concat(event.lineno, ":").concat(event.colno),
                    stack: getLines(event.error.stack),
                });
            }
        }, true);
        window.addEventListener('unhandledrejection', function (event) {
            var message;
            var filename;
            var line = 0;
            var column = 0;
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
                getLines(reason.stack);
            }
            _this.send({
                type: 'error',
                secondType: 'promise',
                message: message,
                filename: filename,
                position: "".concat(line, ":").concat(column),
            });
        }, true);
    };
    return InitError;
}(ReportInfo));

var Monitor = /** @class */ (function () {
    function Monitor(options) {
        this.init(options);
    }
    Monitor.prototype.init = function (options) {
        if (!options.url) {
            console.error('url必传');
        }
        if (!options.apiKey) {
            console.error('apiKey必传');
        }
        new InitError(options);
    };
    return Monitor;
}());

export { Monitor as default };
