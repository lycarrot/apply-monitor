import { v4 as uuidv4 } from 'uuid'

export function formatParams(obj: any): string {
  const strArr = []
  Object.keys(obj).forEach((key) => {
    strArr.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
  })
  return strArr.join('&')
}

export function getLines(stack: string): string {
  return stack
    .split('\n')
    .slice(1)
    .map((item) => item.replace(/^\s+at\s+/g, ''))
    .join('^')
}

export function getNowTime(): number {
  return Date.now()
}

export function switchToMB(bytes: number): number | null {
  if (typeof bytes !== 'number') {
    return null
  }
  return parseFloat((bytes / Math.pow(1024, 2)).toFixed(2))
}

export function generateId(): string {
  return uuidv4()
}

export function getUid(): string {
  const key = 'uuid'
  let uuid = localStorage.getItem(key)
  if (uuid) return uuid
  uuid = generateId()
  localStorage.setItem(key, uuid)
  return uuid
}

export function getIdentity(): string {
  const key = 'identity'
  let identity = sessionStorage.getItem(key)
  if (!identity) {
    // 生成标识
    identity = generateId()
    sessionStorage.setItem(key, identity)
  }
  return identity
}

export function getReferer(): string {
  if (typeof document === 'undefined' || document.location == null) return ''
  return document.location.href
}
