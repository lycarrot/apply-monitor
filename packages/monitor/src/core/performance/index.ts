import { getFP } from './getFP';
import { getLCP } from './getLCP';
import { getCLS } from './getCLS';
import { getFID } from './getFID';
import { getFSP } from './getFSP';
import { getNavTiming } from './getNavTiming';
import { getMemory } from './getMemory';
import { getNavConnection } from './getNavConnection';
import { getDevices } from './getDevices';
import { Store, ReportInfo } from '../../common';
import { onLoaded, onHidden, beforeUnload, getNowTime } from '../../utils';
import {
  InitOptions,
  PerformanceReportData,
  MonitorType,
  Level,
  PerformanceType,
  ReportValue,
} from '../../types';

class Performance {
  newStore: InstanceType<typeof Store>;
  reportInfo: ReportInfo;
  constructor(options: InitOptions) {
    this.newStore = new Store();
    this.reportInfo = new ReportInfo(options);
    this.init();
  }
  init() {
    getFP(this.setStore);
    getLCP(this.setStore);
    getCLS(this.setStore);
    getFID(this.setStore);
    getNavConnection(this.setStore);
    getNavTiming(this.setStore);
    getFSP(this.setStore);
    getMemory(this.setStore);
    getDevices(this.setStore);

    this.report();
  }
  report() {
    [onLoaded, onHidden, beforeUnload].forEach((event) => {
      event(() => {
        let storeData = this.newStore.getValues();
        Object.keys(storeData).forEach((key) => {
          this.reportInfo.send(storeData[key]);
        });
        this.newStore.clear();
      });
    });
  }
  setStore(secondType: PerformanceType, value: ReportValue) {
    let data: PerformanceReportData = {
      type: MonitorType.PERFORMANCE,
      secondType: secondType,
      level: Level.INFO,
      time: getNowTime(),
      value: value,
    };
    this.newStore.set(secondType, data);
  }
}

export default Performance;
