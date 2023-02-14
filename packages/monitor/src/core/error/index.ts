import { InitOptions } from '../../types';
import { ReportInfo } from '../../common';
import { getLines } from '../../utils';

type TargetKeys = {
  src: string;
  href: string;
  tagName: string;
};
class InitError extends ReportInfo {
  constructor(options: InitOptions) {
    super(options.url);
    this.init(options);
  }
  init(options: InitOptions) {
    this.handleJS();
  }
  handleJS() {
    window.addEventListener(
      'error',
      (event) => {
        let target: EventTarget = event.target;
        if (target && (target.src || target.href)) {
          this.send({
            type: 'error',
            secondType: 'resourceError',
            filename: event.target.src || event.target.href, // 哪个文件报错了
            tagName: event.target.tagName,
          });
        } else {
          this.send({
            type: 'error',
            secondType: 'jsError',
            filename: event.filename, // 哪个文件报错了
            message: event.message, // 报错信息
            position: `${event.lineno}:${event.colno}`, // 报错的行列位置
            stack: getLines(event.error.stack),
          });
        }
      },
      true
    );
    window.addEventListener(
      'unhandledrejection',
      (event) => {
        let message;
        let filename;
        let line = 0;
        let column = 0;
        let stack = '';
        let reason = event.reason;
        if (typeof reason === 'string') {
          message = reason;
        } else if (typeof reason === 'object') {
          message = reason.message;
          if (reason.stack) {
            let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
            filename = matchResult[1];
            line = matchResult[2];
            column = matchResult[3];
          }
          stack = getLines(reason.stack);
        }
        this.send({
          type: 'error',
          secondType: 'promise',
          message,
          filename,
          position: `${line}:${column}`,
        });
      },
      true
    );
  }
}

export default InitError;
