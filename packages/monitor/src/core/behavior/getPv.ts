import { getUid, onLoaded, getUrl } from '../../utils';
import { Report, BehaviorType } from '../../types';
export function getPv(report: Report) {
  onLoaded(() => {
    report(BehaviorType.PV, {
      uuid: getUid(),
      pageURL: getUrl(),
      referrer: document.referrer,
    });
  });
}
