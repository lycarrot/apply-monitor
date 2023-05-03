export interface ReportData {
  project: string;
  projectSub: string;
  version:string;
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
  version:string;
  projectSub: string;
  identity: string;
  referer: string;
  key?:string;
  level: string;
}


export interface propAny{
  [key:string]:any;
}