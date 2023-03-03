/**
 * 防抖
 * @param fn
 * @param delay
 * @returns
 */
var throttle = function (fn, delay) {
    var timeout;
    var called = false;
    return function () {
        if (timeout) {
            clearTimeout(timeout);
        }
        if (!called) {
            fn();
            called = true;
            setTimeout(function () {
                called = false;
            }, delay);
        }
        else {
            timeout = setTimeout(fn, delay);
        }
    };
};
/**
 * 节流
 * @param fn
 * @param wait
 * @param immediate
 * @returns
 */
var debounce = function (fn, wait, immediate) {
    var timeout;
    return function () {
        var context = this;
        var args = arguments;
        // 立即执行
        if (immediate) {
            // 第一次timeout为null，则可以执行，一定时间内timeout始终不为null
            var dos = !timeout;
            timeout = setTimeout(function () {
                timeout = null;
            }, wait);
            if (dos) {
                fn.apply(context, args);
            }
        }
        else {
            clearTimeout(timeout);
            timeout = setTimeout(function () {
                fn.apply(context, args);
            }, wait);
        }
    };
};

export { debounce, throttle };
