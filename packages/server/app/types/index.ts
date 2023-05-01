export interface ReportData {
  project: string;
  projectSub: string;
  referer: string;
  identity: string;
  type: string;
  secondType: string;
  key?: string;
  time: number;
  level: string;
  value: any;
}

export interface QueueItem {
  name: string;
  value: string;
  project: string;
  projectSub: string;
  identity: string;
  referer: string;
  key?:string;
  level: string;
  record_time: string;
  report_time: string;
}
