export function formatParams(obj: any): string {
  let strArr = [];
  Object.keys(obj).forEach((key) => {
    strArr.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
  });
  return strArr.join('&');
}

export function getLines(stack: string): string {
  return stack
    .split('\n')
    .slice(1)
    .map((item) => item.replace(/^\s+at\s+/g, ''))
    .join('^');
}
