import { VueInstance } from './vue';
export interface InitOptions {
  // 上传url
  url: string;
  //项目名称
  project: string;
  //子项目名称
  proSub?: string;
  // 是否收集错误
  isCollectErr?: boolean;
  // 是否收集性能
  isCollectPer?: boolean;
  // 是否收集用户行为
  isCollectBehavior?: boolean;
  // 上传方式
  sendWay?: 'sendBeacon' | 'img' | 'ajax';
  isVue?: boolean;
  // 如果是vue类型需要传入Vue;
  vue?: VueInstance;
  // 监听vue路由跳转
  isVueJump: boolean;
  router?: any;
}
