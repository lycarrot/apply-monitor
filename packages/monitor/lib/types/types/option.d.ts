import { VueInstance } from './vue';
export interface InitOptions {
    url: string;
    project: string;
    proSub?: string;
    isCollectErr?: boolean;
    isCollectPer?: boolean;
    isCollectBehavior?: boolean;
    sendWay?: 'sendBeacon' | 'img' | 'ajax';
    isVue?: boolean;
    vue?: VueInstance;
    isVueJump: boolean;
    router?: any;
}
