import { formatParams } from '../utils';
class ReportInfo {
  constructor() {}
  send(url, data) {}
  useImg(url: string, data: object) {
    const requestFun = () => {
      let img = new Image();
      const spliceStr = url.indexOf('?') === -1 ? '?' : '&';
      img.src = `${url}${spliceStr}data=${encodeURIComponent(
        JSON.stringify(data)
      )}`;
      img = null;
    };
    // this.queue.addFn(requestFun);
  }
}

export default ReportInfo;
