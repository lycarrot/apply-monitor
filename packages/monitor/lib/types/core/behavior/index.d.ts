import { InitOptions, ReportValue, BehaviorType } from '../../types'
import { ReportInfo } from '../../common'
declare class Behivor {
  reportInfo: ReportInfo
  constructor(options: InitOptions)
  init(options: InitOptions): void
  report(secondType: BehaviorType, value: ReportValue): void
}
export default Behivor
