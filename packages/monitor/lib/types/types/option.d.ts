import { VueInstance } from './vue';
export interface InitOptions {
    url: string;
    apiKey: string;
    isVue?: boolean;
    vue?: VueInstance;
    sendWay?: 'img' | 'ajax';
}
