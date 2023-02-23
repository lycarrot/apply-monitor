export function onBeforeunload(callback): void {
  window.addEventListener('beforeunload', callback, true);
}
// 页面加载完成
export const onLoaded = (callback): void => {
  if (document.readyState === 'complete') {
    setTimeout(callback);
  } else {
    addEventListener('pageshow', callback);
  }
};
// 页面隐藏
export function onHidden(callback, once?: boolean): void {
  const onHiddenOrPageHide = (event: Event) => {
    if (event.type === 'pagehide' || document.visibilityState === 'hidden') {
      callback(event);
      if (once) {
        window.removeEventListener(
          'visibilitychange',
          onHiddenOrPageHide,
          true
        );
        window.removeEventListener('pagehide', onHiddenOrPageHide, true);
      }
    }
  };

  window.addEventListener('visibilitychange', onHiddenOrPageHide, true);
  window.addEventListener('pagehide', onHiddenOrPageHide, true);
}

// 页面卸载（关闭）或刷新时调用
export const beforeUnload = (callback): void => {
  window.addEventListener('beforeunload', callback);
};

// 页面卸载（关闭）或刷新时调用
export const unload = (callback): void => {
  window.addEventListener('unload', callback);
};
