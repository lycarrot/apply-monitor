import { BaseReportData, ReportValue } from './common'
export enum PerformanceType {
  FP = 'first-paint',
  FCP = 'first-contentful-paint',
  LCP = 'largest-contentful-paint',
  CLS = 'layout-shift',
  FID = 'first-input',
  FSP = 'first-screen-paint',
  NC = 'nav-connecttion',
  NAV = 'navigation',
  MRY = 'memory',
  DICE = 'devices',
  WHITE = 'white-screen',
}

export interface PerformanceReportData extends BaseReportData {
  value?: ReportValue
}

export interface StoreData {
  [prop: string]: PerformanceReportData
}

export interface LayoutShift extends PerformanceEntry {
  value: number
  hadRecentInput: boolean
}

export interface SetStore {
  (secondType: PerformanceType, value: ReportValue): void
}

export interface NodeItem extends Node {
  tagName?: string
}

export interface SourceItem extends PerformanceEntry {
  initiatorType?: string
  fetchStart?: number
  responseEnd?: number
}

export interface NavConnection {
  downlink?: number
  effectiveType?: string
  rtt?: number
}

export interface DevicesInfo {
  host: string
  hostname: string
  href: string
  protocol: string
  origin: string
  port: string
  pathname: string
  search: string
  hash: string
  userAgent?: string
  screenResolution: string
}

export interface PerReportData extends BaseReportData {
  value?: ReportValue
}
