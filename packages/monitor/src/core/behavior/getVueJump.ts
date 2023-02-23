import { Report, BehaviorType } from '../../types';
type Value = {
  from: string;
  to: string;
  name: string;
};
export function getVueJump(report: Report, router) {
  router.beforeEach((to, from, next) => {
    if (!from) {
      next();
      return;
    }
    let value: Value = {
      from: from.fullPath,
      to: to.fullPath,
      name: to.name || to.path,
    };
    report(BehaviorType.VJ, value);
  });
}
