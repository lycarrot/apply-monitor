import { getUid, onBeforeunload, getUrl } from '../../utils';
import { Report, BehaviorType } from '../../types';
export function getPageDuration(report: Report) {
  let start = performance.now();
  onBeforeunload(() => {
    report(BehaviorType.PD, {
      pageURL: getUrl(),
      duraion: performance.now() - start,
    });
  });
}
