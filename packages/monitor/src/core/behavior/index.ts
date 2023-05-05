import { getPv } from './getPv'
import { getVueJump } from './getVueJump'
import {
  InitOptions,
  ReportValue,
  MonitorType,
  BehaviorType,
  Level,
} from '../../types'
import { ReportInfo } from '../../common'
import { getNowTime } from '../../utils'

class Behivor {
  reportInfo: ReportInfo
  constructor(options: InitOptions) {
    this.init(options)
    this.reportInfo = new ReportInfo(options)
  }
  init(options: InitOptions) {
    getPv(this.report)
    if (options.isVueJump) {
      getVueJump(this.report, options.router)
    }
  }
  report(secondType: BehaviorType, value: ReportValue) {
    this.reportInfo.send({
      type: MonitorType.BEHAVIOR,
      secondType: secondType,
      level: Level.INFO,
      time: getNowTime(),
      value: value,
    })
  }
}

export default Behivor
