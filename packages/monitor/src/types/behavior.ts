import { BaseReportData, ReportValue } from './common';
export enum BehaviorType {
  PV = 'pv',
  VJ = 'vue-jump',
  PD = 'page-duration',
}

export interface BehaviorReportData extends BaseReportData {
  value?: ReportValue;
}

export interface Report {
  (secondType: BehaviorType, value: ReportValue): void;
}
