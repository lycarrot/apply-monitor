export enum MonitorType {
  ERROR = 'error',
}

export enum Level {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
}

export interface BaseReportData {
  type: MonitorType;
  secondType?: string;
  time: number;
  level: Level;
}

export interface CompleteReportData extends BaseReportData {
  // js
  message?: string;
  filename?: string;
  tagName?: string;
  position?: string;
  stack?: string;
  // Vue
  info?: string;
  componentName?: string;
  //ajax
  status?: number;
  statusText?: string;
  url?: string;
}

export interface IAnyObject {
  [key: string]: any;
}
