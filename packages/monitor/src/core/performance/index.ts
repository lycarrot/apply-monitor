import { getFP } from './getFP';
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
