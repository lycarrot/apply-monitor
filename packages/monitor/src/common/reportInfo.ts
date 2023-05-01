import { formatParams, getReferer, getIdentity } from '../utils';
import {
  PerReportData,
  ErrorReportData,
  CommonData,
  InitOptions,
} from '../types';
import { Queue } from './queue';

type Data = PerReportData | ErrorReportData;
type SendData = CommonData & Data;

class ReportInfo {
  queue: Queue;
  options: InitOptions;
  sendWay: string;

  constructor(options: InitOptions) {
    this.options = options;
    this.sendWay = options.sendWay;
    this.queue = new Queue();
  }
  beforeSend(data: Data): SendData {
    let commonInfo = {
      project: this.options.project,
      projectSub: this.options.proSub,
      referer: getReferer(),
      identity: getIdentity(),
    };
    return Object.assign(data, commonInfo);
  }
  send(data: Data, isImmediate?: boolean): void {
    let sendData = this.beforeSend(data);
    const fn =
      this.sendWay == 'sendBeacon'
        ? this.useBeacon(sendData)
        : this.sendWay == 'img'
        ? this.useImg(sendData)
        : this.useAjax(sendData);
    isImmediate ? fn() : this.queue.push(fn);
  }
  useImg(data: Data): () => void {
    const fn = () => {
      let img = new Image();
      const spliceStr = this.options.url.indexOf('?') === -1 ? '?' : '&';
      img.src = `${this.options.url}${spliceStr}${formatParams(data)}`;
      img = null;
    };
    return fn;
  }
  useAjax(data: Data): () => void {
    const fn = () => {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', this.options.url);
      xhr.withCredentials;
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(data));
      xhr.onreadystatechange = function () {
        console.log(xhr.readyState, xhr.status);
      };
    };
    return fn;
  }
  useBeacon(data: Data): () => void {
    if (navigator.sendBeacon) {
      const fn = () => {
        navigator.sendBeacon(this.options.url, JSON.stringify(data));
      };
      return fn;
    } else {
      return this.useAjax(data);
    }
  }
}

export { ReportInfo };
