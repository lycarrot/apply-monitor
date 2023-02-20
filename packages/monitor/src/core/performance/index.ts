import { getFP } from './getFP';
import { getLCP } from './getLCP';
import { getCLS } from './getCLS';
import { getFID } from './getFID';
import { getFSP } from './getFSP';
import { getNavTiming } from './getNavTiming';
import { getMemory } from './getMemory';
import { getNavConnection } from './getNavConnection';
import { Store, ReportInfo } from '../../common';
import { afterLoad, onHidden, beforeUnload } from '../../utils';
import { InitOptions } from '../../types';

class Performance {
  newStore: InstanceType<typeof Store>;
  reportInfo: ReportInfo;
  constructor(options: InitOptions) {
    this.newStore = new Store();
    this.reportInfo = new ReportInfo(options);
    this.init();
  }
  init() {
    getFP(this.newStore);
    getLCP(this.newStore);
    getCLS(this.newStore);
    getFID(this.newStore);
    getNavConnection(this.newStore);
    getNavTiming(this.newStore);
    getFSP(this.newStore);
    getMemory(this.newStore);
    this.report();
  }
  report() {
    [afterLoad, onHidden, beforeUnload].forEach((event) => {
      event(() => {
        let storeData = this.newStore.getValues();
        Object.keys(storeData).forEach((key) => {
          this.reportInfo.send(storeData[key]);
        });
        this.newStore.clear();
      });
    });
  }
}

export default Performance;
