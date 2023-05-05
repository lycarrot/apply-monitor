import Router from 'koa-router'
import type { Context, Request } from 'koa'
import Resolve from '../utils/resolve'
import services from '../services'
import config from 'config'
import fs from 'fs'
import path from 'path'
import sourceMap from 'source-map'

interface Result {
  source: string
  line: number
  column: number
}
interface sourcesPathMap {
  [key: string]: string
}
const sourceMapFile = config.get('sourceMap')

const fixPath = (filepath: string) => {
  return filepath.replace(/\.[\.\/]+/g, '')
}

interface ListsParams {
  page: number
  pageSize: number
  project: string
  startTime?: number
  endTime?: number
}
const reverseSourceMap = async function (data: any) {
  return new Promise(async (resolve, reject) => {
    try {
      const { project, version, value } = data
      const complPath = path.resolve(`${sourceMapFile}/${project}/${version}`)
      const files = fs.readdirSync(complPath)
      if (!files.length) {
        log.warn('没有找到sourcemap文件')
        resolve(null)
        return
      }
      const { stack, row, col } = JSON.parse(value)
      if (!row || !col) {
        log.warn('文件还原失败，没有相应的行和列')
        resolve(null)
        return
      }
      const mapFiles = files.filter((file: string) => file.indexOf('.map') > -1)
      // 找到错误出现相应的sourmap文件
      mapFiles.sort((a: string, b: string) => {
        let aIndex: number = stack.indexOf(a.slice(0, a.indexOf('.map')))
        aIndex = aIndex == -1 ? Infinity : aIndex
        let bIndex: number = stack.indexOf(b.slice(0, b.indexOf('.map')))
        bIndex = bIndex == -1 ? Infinity : bIndex
        return aIndex - bIndex
      })
      const matchFile: string | null = mapFiles[0]

      if (matchFile) {
        const data = fs.readFileSync(`${complPath}/${matchFile}`)
        if (!data) {
          log.warn('没有读取到${matchFile}文件内容')
          resolve(null)
          return
        }
        const rawSourceMap = JSON.parse(data.toString())
        const sources: string[] = rawSourceMap.sources
        const sourcesPathMap: sourcesPathMap = {}
        sources.forEach((item) => (sourcesPathMap[fixPath(item)] = item))
        const consumer = await new sourceMap.SourceMapConsumer(rawSourceMap)
        const lookup = {
          line: parseInt(row),
          column: parseInt(col),
        }
        // 找到报错代码具体位置和文件名
        const result = consumer.originalPositionFor(lookup) as Result
        const sourceFile = sourcesPathMap[result.source]
        // 报错代码详情
        if (consumer.sourcesContent) {
          const sourcesCode =
            consumer.sourcesContent[sources.indexOf(sourceFile)]
          resolve({
            code: sourcesCode,
            line: result.line,
            column: result.column,
            source: result.source,
          })
          return
        }
      }
    } catch (err) {
      reject(err)
    }
  })
}

const router = new Router()

router.post('/lists', async (ctx: Context) => {
  const request: Request = ctx.request
  const { page, pageSize, project, startTime, endTime } =
    request.body as ListsParams
  const { rows, count } = await services.error.getErrorLists({
    page,
    pageSize,
    project,
    startTime,
    endTime,
  })
  const lists = rows.map(async (item: any) => {
    const sourceRes = await reverseSourceMap(item)
    return {
      id: item.id,
      name: item.name,
      source: sourceRes,
      createdAt: item.createdAt,
    }
  })
  const resLists = await Promise.all([...lists])
  const resultLists = resLists.map((source, index) => {
    const list = rows[index]
    return {
      id: list.id,
      name: list.name,
      source,
      createdAt: list.createdAt,
    }
  })

  ctx.body = Resolve.success({
    lists: resultLists,
    count,
    page,
    pageSize,
  })
})
export default router
