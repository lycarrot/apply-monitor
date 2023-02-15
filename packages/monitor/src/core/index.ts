import { InitOptions } from '../types';
import { defaultOptions } from '../config';
import initError from './error';
class Monitor {
  constructor(options: InitOptions) {
    this.init(options);
  }
  init(options: InitOptions): void {
    if (!options.url) {
      console.error('url必传');
      return;
    }
    if (!options.apiKey) {
      console.error('apiKey必传');
      return;
    }
    if (options.isVue && !options.vue) {
      console.log('如果选择监控的是Vue程序,请在vue字段上传入Vue');
      return;
    }
    this.setDefault(options);
    new initError(options);
  }
  setDefault(options: InitOptions) {
    Object.keys(defaultOptions).forEach((key) => {
      if (!options[key]) {
        options[key] = defaultOptions[key];
      }
    });
  }
}

export default Monitor;
