(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["@apply-monitor/monitor"] = {}));
})(this, (function (exports) { 'use strict';

	var a = 6666;

	exports.a = a;

}));
