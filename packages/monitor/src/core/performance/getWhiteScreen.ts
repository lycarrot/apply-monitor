import { SetStore, InitOptions, PerformanceType } from '../../types'
export function getWhiteScreen(setStore: SetStore, options: InitOptions) {
  const isSkeletonScreen = options.isSkeletonScreen
  let pooCount = 0
  const startSampLists: string[] = []
  let nowSampLists: string[] = []
  const containerLists = ['html', 'body', '#app', '#root']
  let timer = null
  if (options.isSkeletonScreen) {
    if (document.readyState != 'complete') {
      onSamp()
    }
  } else {
    if (document.readyState === 'complete') {
      onSamp()
    } else {
      window.addEventListener('load', onSamp)
    }
  }

  function getSelector(element: any) {
    if (element.id) {
      return '#' + element.id
    } else if (element.className) {
      return (
        '.' +
        element.className
          .split(' ')
          .filter((item: any) => !!item)
          .join('.')
      )
    } else {
      return element.nodeName.toLowerCase()
    }
  }

  function isContainer(element: HTMLElement) {
    const selector = getSelector(element)
    if (isSkeletonScreen) {
      pooCount ? nowSampLists.push(selector) : startSampLists.push(selector)
    }
    return containerLists?.includes(selector)
  }
  // 采样对比
  function onSamp() {
    let points = 0
    for (let i = 1; i <= 9; i++) {
      const xElements = document.elementsFromPoint(
        (window.innerWidth * i) / 10,
        window.innerHeight / 2
      )
      const yElements = document.elementsFromPoint(
        window.innerWidth / 2,
        (window.innerHeight * i) / 10
      )
      if (isContainer(xElements[0] as HTMLElement)) points++
      //避免中心点计算多次
      if (i != 5) {
        if (isContainer(yElements[0] as HTMLElement)) points++
      }
    }
    if (points != 17) {
      if (isSkeletonScreen) {
        if (!pooCount) return onLoop()
        if (nowSampLists.join() == startSampLists.join())
          setStore(PerformanceType.WHITE, { isWhite: true })
        return
      }
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    } else {
      if (!timer) {
        onLoop()
      }
    }
    setStore(PerformanceType.WHITE, { isWhite: points == 17 ? true : false })
  }
  //白屏轮训检测
  function onLoop(): void {
    if (timer) return
    timer = setInterval(() => {
      if (isSkeletonScreen) {
        pooCount++
        nowSampLists = []
      }
      onSamp()
    }, 1000)
  }
}
