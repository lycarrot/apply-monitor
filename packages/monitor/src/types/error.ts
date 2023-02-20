import { BaseReportData } from './common';
export enum ErrorType {
  JS = 'js_error',
  RESOURCE = 'resource_error',
  VUE = 'vue_error',
  PROMISE = 'promise_error',
  AJAX = 'ajax_error',
}

export interface JsEventTarget {
  src?: string;
  href?: string;
  tagName?: string;
}

export interface AjaxEventTarget {
  status?: number;
  response?: string;
  statusText?: string;
  responseURL?: string;
}

export interface ErrorReportData extends BaseReportData {
  // js
  message?: string;
  filename?: string;
  tagName?: string;
  position?: string;
  stack?: string;
  // Vue
  info?: string;
  componentName?: string;
  //ajax
  status?: number;
  statusText?: string;
  url?: string;
}
