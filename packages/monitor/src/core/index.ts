import { InitOptions } from '../types';
import { defaultOptions } from '../config';
import Error from './error';
import Performance from './performance';

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
      console.log('如果isVue为true时,请在vue字段上传入Vue');
      return;
    }
    this.setDefault(options);
    new Error(options);
    new Performance(options);
  }
  setDefault(options: InitOptions) {
    Object.keys(defaultOptions).forEach((key: string) => {
      if (!options[key]) {
        options[key] = defaultOptions[key];
      }
    });
  }
}

export default Monitor;
