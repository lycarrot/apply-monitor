import { InitOptions } from '../types';
import initError from './error';
class Monitor {
  constructor(options: InitOptions) {
    this.init(options);
  }
  init(options: InitOptions): void {
    if (!options.url) {
      console.error('url必传');
    }
    if (!options.apiKey) {
      console.error('apiKey必传');
    }
    new initError(options);
  }
}

export default Monitor;
