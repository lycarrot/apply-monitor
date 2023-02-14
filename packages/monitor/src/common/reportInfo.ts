import { formatParams } from '../utils';
class ReportInfo {
  url: string;
  data: any;
  constructor(url: string) {
    this.url = url;
    this.data = {};
  }
  send(data): void {
    this.useImg(data);
  }
  useImg(data: any): void {
    // const fn = () => {
    let img = new Image();
    const spliceStr = this.url.indexOf('?') === -1 ? '?' : '&';
    img.src = `${this.url}${spliceStr}${formatParams(data)}`;
    img = null;
    // };
    // this.queue.addFn(requestFun);
  }
}

export { ReportInfo };
