import { VueInstance } from './vue';
export interface InitOptions {
  url: string;
  apiKey: string;
  isVue?: boolean;
  // 如果是vue类型需要传入Vue;
  vue?: VueInstance;
  // 上传方式
  sendWay?: 'img' | 'ajax';
}
