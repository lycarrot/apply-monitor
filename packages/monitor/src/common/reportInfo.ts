import { formatParams } from '../utils';
class ReportInfo {
  url: string;
  data: any;
  constructor(options) {
    this.url = options.url;
    this.data = options.data;
  }
  send(): void {
    this.useImg(this.url, this.data);
  }
  useImg(url: string, data: any): void {
    // const fn = () => {
    let img = new Image();
    const spliceStr = url.indexOf('?') === -1 ? '?' : '&';
    img.src = `${url}${spliceStr}${formatParams(data)}`;
    img = null;
    // };
    // this.queue.addFn(requestFun);
  }
}

export default ReportInfo;
