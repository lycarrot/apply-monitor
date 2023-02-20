import { formatParams } from '../utils';
import { ErrorReportData, InitOptions } from '../types';
import { Queue } from './queue';
class ReportInfo {
  queue: Queue;
  url: string;
  senday: string;
  constructor(options: InitOptions) {
    this.url = options.url;
    this.senday = options.sendWay;
    this.queue = new Queue();
  }
  send(data: ErrorReportData): void {
    this.senday == 'img' ? this.useImg(data) : this.useAjax(data);
  }
  useImg(data: ErrorReportData): void {
    const fn = () => {
      let img = new Image();
      const spliceStr = this.url.indexOf('?') === -1 ? '?' : '&';
      img.src = `${this.url}${spliceStr}${formatParams(data)}`;
      img = null;
    };
    this.queue.push(fn);
  }
  useAjax(data: ErrorReportData) {
    const fn = () => {
      let xhr = new XMLHttpRequest();
      xhr.open('POST', this.url);
      xhr.withCredentials;
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(data));
    };
    this.queue.push(fn);
  }
}

export { ReportInfo };
